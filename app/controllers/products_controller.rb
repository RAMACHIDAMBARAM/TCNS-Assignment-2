class ProductsController < ApplicationController

 def index
    @products =  Product.order(:order_no)
    respond_to do |format|
    format.html
    format.csv { send_data @products.to_csv, filename: "Master-CSV-#{Date.today}.csv" }
    # format.xls #{ send_data @products.to_csv(col_sep: "\t"), filename: "Master-CSV-#{Date.today}.xls" }
    end
  end

	def import
	  file = params[:file]
      spreadsheet = Roo::Spreadsheet.open(file)

      header = spreadsheet.row(1)

      (2..spreadsheet.last_row).map do |i|
         next unless spreadsheet.row(i)[0]
         row = Hash[[header, spreadsheet.row(i)].transpose]
         row.default = ""

      b = row["Bank Name"]
      c = row["Payment Type"]
      d = row["MPS Amount"]
      e = row["Sale Tax Form Acknowledgement No."]    
      f = row["Invoice Zone"]
      g = row["Client"]
      h = row["Waybill"]
      i = row["invoice code"]
      j = row["product mrp"]
      k = row["sale discount"]
      l = row["price"]
      m = row["tax"]
      n = row["gross amount"]
      o = row["payment status"]
      q = row["customer email"]
      r = row["transaction date"]

      if row.key?("coupon_code")
      	s = row["coupon_code"]
 	 end

 	 if row.key?("coupon value")
       s = row["coupon value"]
    end

    if row.key?("Type")
    	t = row["Type"]
    end
    if row.key?("payment type")
    	t = row["payment type"]
    end



       if row.key?("Amount")
     	 u = row["Amount"]
 	 end
 	 if row.key?("amount payable")
 	 	u = row["amount payable"]
 	 end

     
      if row.key?("order code")
        a = row["order code"]  
    end
      if row.key?("Order #")
        a = row["Order #"]
    end
      if row.key?("Transaction ID")
      	a = row["Transaction ID"]
      end

         import = Product.where(order_no: a , price: l , product_mrp: j , tax: m , sale_discount: k  , 
         	gross_amount: n , amount_payable: u , bank_name: b , e_payment_type:  c , transaction_date: r , Sale_tax_form_acknowledgement_no: e , mps_amount: d)
        
	      if import.exists?
	         import.update(amount_payable: u)

	      else
	           y = Product.new(order_no: a , way_bill: h , invoice_code: i , client: g ,
	         customer_email: q , invoice_zone: f , price: l , product_mrp: j , tax: m , sale_discount: k ,
	          coupon_value: s , gross_amount: n ,  amount_payable: u , e_payment_type: c , payment_status: o ,  bank_name: b , payment_type: t , transaction_date: r ,
	            Sale_tax_form_acknowledgement_no: e , mps_amount: d)
	        
	          y.save
	         
	      end

      end
      redirect_to root_url, notice: "Imported Successfully" and return
	end	
end
