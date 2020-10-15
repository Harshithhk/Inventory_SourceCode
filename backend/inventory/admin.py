from django.contrib import admin

from .models import category, Product, Order, Order_Items, Customer
# Register your models here.

admin.site.register(Product)
admin.site.register(category)
admin.site.register(Order)
admin.site.register(Order_Items)
admin.site.register(Customer)