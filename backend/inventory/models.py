from django.db import models
from datetime import date

# Create your models here.

class category(models.Model):

    name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.name
    

class Product(models.Model):

    name = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=50)
    distributer = models.CharField(max_length=20, blank=True)
    category = models.ForeignKey('category', on_delete=models.CASCADE,default=None)
    size = models.CharField(max_length=10, blank= True)
    weight = models.FloatField(default = 0)
    quantity = models.IntegerField(default=1)
    cost_price = models.FloatField(default=0)
    selling_price = models.FloatField(default=1)
    mfg_date = models.DateField(default=date.today)
    exp_date = models.DateField()
    #image

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=50)
    phone_no = models.IntegerField()
    daily_service = models.BooleanField(default=False)
    outstanding_amount = models.FloatField()
    amount_paid = models.FloatField()

    def __str__(self):
        return self.name
    


# To be added to actual project
class Order(models.Model):
    order_date = models.DateTimeField(auto_now=True)
    total_cost = models.CharField( max_length=50)
    order_items = models.ManyToManyField("inventory.Order_Items")
    paid = models.BooleanField(default=False)
    daily_order = models.BooleanField(default = False)
    customer = models.ForeignKey("inventory.Customer", on_delete=models.CASCADE, blank= True)

    def __str__(self):
        return f'{self.order_date}'

class Order_Items(models.Model):
    product_id = models.IntegerField()
    quantity = models.IntegerField(default=1)