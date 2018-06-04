class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
    	 t.text :order_no
    	 t.text :way_bill
    	 t.text :invoice_code
    	 t.text :client
    	 t.text :customer_email
    	 t.text :invoice_zone
    	 t.text :price
    	 t.text :product_mrp
    	 t.text :tax
    	 t.text :sale_discount
    	 t.text :coupon_value
    	 t.text :gross_amount
    	 t.text :amount_payable
    	 t.text :payment_type
    	 t.text :payment_status
    	 t.text :bank_name
    	 t.text :e_payment_type	 
    	 t.text :transaction_date
    	 t.text :Sale_tax_form_acknowledgement_no
    	 t.text :mps_amount   	
    	 t.timestamps
    end
  end
end
