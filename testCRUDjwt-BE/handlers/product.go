package handlers

import (
	"encoding/json"
	productdto "greatpee/dto/product"
	dto "greatpee/dto/result"
	"greatpee/models"
	"greatpee/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// for i, p := range products {
	// 	imagePath := os.Getenv("PATH_FILE") + p.Image
	// 	products[i].Image = imagePath
	// }

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: products}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) GetProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var product models.Product
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product.Image = os.Getenv("PATH_FILE") + product.Image

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseProduct(product)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) CreateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get data user token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// get image filename
	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)

	hargabeli, _ := strconv.Atoi(r.FormValue("hargabeli"))
	hargajual, _ := strconv.Atoi(r.FormValue("hargajual"))
	qty, _ := strconv.Atoi(r.FormValue("qty"))

	request := productdto.ProductRequest{
		Name:      r.FormValue("name"),
		HargaBeli: hargabeli,
		HargaJual: hargajual,
		Qty:       qty,
		UserID:    userId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product := models.Product{
		Name:      request.Name,
		HargaBeli: request.HargaBeli,
		HargaJual: request.HargaJual,
		Image:     os.Getenv("PATH_FILE") + filename,
		Qty:       request.Qty,
		UserID:    userId,
	}

	product, err = h.ProductRepository.CreateProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product, _ = h.ProductRepository.GetProduct(product.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: product}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get product id
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// get data user token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	// get image filename
	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)

	hargabeli, _ := strconv.Atoi(r.FormValue("hargabeli"))
	hargajual, _ := strconv.Atoi(r.FormValue("hargajual"))
	qty, _ := strconv.Atoi(r.FormValue("qty"))

	request := productdto.ProductRequest{
		Name:      r.FormValue("name"),
		HargaBeli: hargabeli,
		HargaJual: hargajual,
		Qty:       qty,
		Image:     os.Getenv("PATH_FILE") + filename,
		UserID:    userId,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	product, _ := h.ProductRepository.GetProduct(id)

	product.Name = request.Name
	product.HargaBeli = request.HargaBeli
	product.HargaJual = request.HargaJual
	product.Qty = request.Qty
	product.Image = request.Image

	if filename != "false" {
		product.Image = filename
	}

	product, err = h.ProductRepository.UpdateProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: product}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProduct) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get data user token
	// userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userId := int(userInfo["id"].(float64))

	// Get product id
	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	deleteProduct, err := h.ProductRepository.DeleteProduct(product)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: deleteProduct}
	json.NewEncoder(w).Encode(response)
}

func convertResponseProduct(p models.Product) models.ProductResponse {
	return models.ProductResponse{
		ID:        p.ID,
		Name:      p.Name,
		HargaBeli: p.HargaBeli,
		HargaJual: p.HargaJual,
		Image:     p.Image,
		Qty:       p.Qty,
		User:      p.User,
	}
}
