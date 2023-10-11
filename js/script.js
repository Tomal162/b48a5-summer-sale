document.addEventListener("DOMContentLoaded", function () {
    
    const applyButton = document.getElementById("applyButton");
    const makePurchaseButton = document.getElementById("makePurchaseButton");
    const couponCodeInput = document.getElementById("couponCodeInput");
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");
    const discount = document.getElementById("discount");
    const finalTotal = document.getElementById("finalTotal");
    const purchaseModal = document.getElementById("purchaseModal");
    const goHomeButton = document.getElementById("goHomeButton");

  
    const cart = [];
    let totalAmount = 0;
    let appliedDiscount = 0;

    
    function updateCartAndTotals() {
        cartList.innerHTML = ""; 
        totalAmount = 0;

    
        cart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item.name;
            cartList.appendChild(listItem);
            totalAmount += item.price;
        });

        
        totalPrice.textContent = `$${totalAmount.toFixed(2)}`;

        
        if (totalAmount > 0) {
            makePurchaseButton.removeAttribute("disabled");
        } else {
            makePurchaseButton.setAttribute("disabled", "true");
        }

        
        if (totalAmount > 200) {
            applyButton.removeAttribute("disabled");
        } else {
            applyButton.setAttribute("disabled", "true");
        }

      
        const couponCode = couponCodeInput.value.trim();
        if (couponCode === "SELL200") {
            appliedDiscount = 0.2 * totalAmount;
        } else {
            appliedDiscount = 0;
        }

        discount.textContent = `$${appliedDiscount.toFixed(2)}`;
        finalTotal.textContent = `$${(totalAmount - appliedDiscount).toFixed(2)}`;
    }

    
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const name = card.getAttribute("data-name");
            const price = parseFloat(card.getAttribute("data-price"));
            cart.push({ name, price });
            updateCartAndTotals();
        });
    });

 
    applyButton.addEventListener("click", () => {
        updateCartAndTotals();
    });

    
    makePurchaseButton.addEventListener("click", () => {
        
        purchaseModal.classList.remove("hidden");

       
        cart.length = 0;
        updateCartAndTotals();
    });

    
    goHomeButton.addEventListener("click", () => {
      
        purchaseModal.classList.add("hidden");

       
        cart.length = 0;
        updateCartAndTotals();
    });
});