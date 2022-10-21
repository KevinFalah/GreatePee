package productdto

type ProductRequest struct {
	Name      string `json:"name" form:"name" gorm:"type: varchar(255)" validate:"required"`
	HargaBeli int    `json:"hargabeli" form:"hargabeli" gorm:"type: int" validate:"required"`
	HargaJual int    `json:"hargajual" form:"hargajual" gorm:"type: int" validate:"required"`
	Qty       int    `json:"qty" form:"qty" gorm:"type: int" validate:"required"`
	UserID    int    `json:"user_id" form:"user_id"`
	Image     string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
