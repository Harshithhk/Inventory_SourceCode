from rest_framework.serializers import ModelSerializer
from .models import Product, category, Order, Order_Items, Customer


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = category
        fields = ['name',]


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'phone_no', 'daily_service', 'outstanding_amount', 'amount_paid']



# To be added to actual project
class Order_ItemsSerializer(ModelSerializer):
    class Meta:
        model = Order_Items
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    order_items = Order_ItemsSerializer(many=True, source='order_items_set')

    class Meta:
        model = Order
        fields = ['id','order_items', 'total_cost', 'paid', 'daily_order', 'customer']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)
        for order_item_data in order_items_data:
            Order_Items.objects.create(order=order, **order_item_data)
        return order