package models

import "time"

type Product struct {
	ID        int                  `json:"id" gorm:"primary_key:auto_increment"`
	Name      string               `json:"name" form:"name" gorm:"type: varchar(255)"`
	HargaBeli int                  `json:"hargabeli" form:"hargabeli" gorm:"type: int"`
	HargaJual int                  `json:"hargajual" form:"hargajual" gorm:"type: int"`
	Image     string               `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty       int                  `json:"qty" form:"qty"`
	UserID    int                  `json:"user_id" form:"user_id"`
	User      UsersProfileResponse `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	CreatedAt time.Time            `json:"-"`
	UpdatedAt time.Time            `json:"-"`
}

type ProductResponse struct {
	ID        int                  `json:"id"`
	Name      string               `json:"name"`
	HargaBeli int                  `json:"hargabeli"`
	HargaJual int                  `json:"hargajual"`
	Image     string               `json:"image"`
	Qty       int                  `json:"qty"`
	UserID    int                  `json:"-"`
	User      UsersProfileResponse `json:"user"  gorm:"foreignKey:UserID"`
}

type ProductUserResponse struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	HargaJual int    `json:"hargabeli"`
	HargaBeli int    `json:"hargajual"`
	Image     string `json:"image"`
	Qty       int    `json:"qty"`
	UserID    int    `json:"-"`
}

func (ProductResponse) TableName() string {
	return "products"
}

func (ProductUserResponse) TableName() string {
	return "products"
}
