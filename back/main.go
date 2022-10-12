package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	//"net/smtp"
	"path"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
)

var db, _ = sql.Open("mysql", "root:@tcp(localhost)/pierrot")

type User struct {
	ID       int    `json:"ID"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
	PP       string `json:"PP"`
	Cart_ID  int    `json:"cart_ID"`
}

type Session struct {
	UserID   int
	UserName string
	Token    string
}

type Pierre struct {
	ID                 int    `json:"ID"`
	Pierre_name        string `json:"pierre_name"`
	Pierre_description string `json:"pierre_description"`
	Pierre_price       int    `json:"pierre_price"`
	Categorie          string `json:"categorie"`
	Avis               []Avis
}
type Avis struct {
	ID        int    `json:"ID"`
	Pierre_ID int    `json:"pierre_ID"`
	User_ID   int    `json:"user_ID"`
	Note      string `json:"note"`
	Text      string `json:"text"`
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
}

func getPierres() []Pierre {
	var query, _ = db.Query("SELECT * FROM pierrot.pierre")
	var pierres []Pierre

	for query.Next() {
		var pierre Pierre
		query.Scan(&pierre.ID, &pierre.Pierre_name, &pierre.Pierre_description, &pierre.Pierre_price, &pierre.Categorie)
		pierre = get_avis(pierre)
		pierres = append(pierres, pierre)
	}
	return pierres
}
func get_avis(pierre Pierre) Pierre {
	var query, _ = db.Query("SELECT * FROM pierrot.avis")
	for query.Next() {
		var avis Avis
		query.Scan(&avis.ID, &avis.Pierre_ID, &avis.User_ID, &avis.Note, &avis.Text)
		if avis.Pierre_ID == pierre.ID {
			pierre.Avis = append(pierre.Avis, avis)
		}
	}
	fmt.Println(pierre.Avis)
	return pierre

}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	//Permet de recuperer la requete en frond pour la mettre dasn la db

	var register User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&register)
	fmt.Println(register.Name)
	fmt.Println(register)
	a, _ := json.Marshal(register)
	w.Write(a)
	insert := `INSERT INTO pierrot.user (NAME,PASSWORD, EMAIL) VALUES ("` + register.Name + `","` + register.Password + `","` + register.Email + `")`
	db.Query(insert)
	fmt.Println(insert)
	selectID := `SELECT ID FROM pierrot.user WHERE EMAIL="` + register.Email + `"`
	IDUsr := db.QueryRow(selectID)
	IDUsr.Scan(&register.ID)
	fmt.Println(register.ID)
	insertCart := `INSERT INTO pierrot.cart (USER_ID) VALUES ("` + strconv.Itoa(register.ID) + `")`
	db.Query(insertCart)
	selectCartID := `SELECT ID FROM pierrot.cart WHERE USER_ID="` + strconv.Itoa(register.ID) + `"`
	IDCart := db.QueryRow(selectCartID)
	IDCart.Scan(&register.Cart_ID)
	fmt.Println(register.Cart_ID)
	insertCartID := `UPDATE pierrot.user SET CART_ID="` + strconv.Itoa(register.Cart_ID) + `" WHERE ID="` + strconv.Itoa(register.ID) + `"`
	db.Query(insertCartID)

}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	var user User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&user)
	emailVar := `SELECT ID, NAME,PASSWORD, EMAIL,PP, CART_ID FROM pierrot.user WHERE EMAIL="` + user.Email + `" AND PASSWORD="` + user.Password + `"`
	fmt.Println(emailVar)
	var getRaw = db.QueryRow(emailVar)
	getRaw.Scan(&user.ID, &user.Name, &user.Password, &user.Email, &user.PP, &user.Cart_ID)
	fmt.Println(user.ID)
	fmt.Println(user)
	a, _ := json.Marshal(user)
	w.Write(a)
}
func mdpoublie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	var user User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&user)
	emailVar := `SELECT ID, NAME,PASSWORD, EMAIL,PP, CART_ID FROM pierrot.user WHERE EMAIL="` + user.Email + `"`
	fmt.Println(emailVar)
	var getRaw = db.QueryRow(emailVar)
	getRaw.Scan(&user.ID, &user.Name, &user.Password, &user.Email, &user.PP, &user.Cart_ID)
	fmt.Println(user.ID)
	fmt.Println(user)
	a, _ := json.Marshal(user)
	w.Write(a)
}

/*func envoiemail() {
	// Sender data.
	from := "brainbotcnm@gmail.com"
	password := "RespectGUCC1"

	// Receiver email address.
	to := []string{
		"sender@example.com",
	}

	// smtp server configuration.
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	// Message.
	message := []byte("This is a test email message.")

	// Authentication.
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// Sending email.
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Email Sent Successfully!")
}
*/

// func cartHandler(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Content-Type", "application/json")
// 	var pierre Pierre
// 	decoder := json.NewDecoder(r.Body)
// 	decoder.Decode(&pierre)
// 	pierreVar := `INSERT INTO labaiepierre.cart  (USER_ID, PIERRE_ID) VALUES ("` + strconv.Itoa(pierre.ID) + `")`
// }

func pierresHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	a, _ := json.Marshal(getPierres())
	w.Write(a)
}

func pierreHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	pathID := r.URL.Path
	pathID = path.Base(pathID)
	pathIDint, _ := strconv.Atoi(pathID)
	getPierresVar := getPierres()
	a, _ := json.Marshal(getPierresVar[pathIDint-1])
	w.Write(a)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	var users []User
	var query, _ = db.Query("SELECT * FROM pierrot.user")
	for query.Next() {
		var user User
		query.Scan(&user.ID, &user.Name, &user.Password, &user.Email, &user.PP, user.Cart_ID)
		users = append(users, user)
	}
	fmt.Println(users)
	a, _ := json.Marshal(users)
	w.Write(a)
}

func main() {
	http.HandleFunc("/api/", apiHandler)
	http.HandleFunc("/api/register", registerHandler)
	http.HandleFunc("/api/login", loginHandler)
	http.HandleFunc("/api/pierre", pierresHandler)
	http.HandleFunc("/api/pierre/", pierreHandler)
	http.HandleFunc("/api/oublie", mdpoublie)
	// http.HandleFunc("/api/cart", cartHandler)
	http.HandleFunc("/api/user", userHandler)

	log.Fatal(http.ListenAndServe(":50", nil))

}
