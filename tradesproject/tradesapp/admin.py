from django.contrib import admin
from tradesapp.models import User, Trader, Consumer, TraderStockInfo
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'middle_name', 'mobile', 'zipcode', 'address', 'gender', 'is_trader')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

class TraderAdmin(admin.ModelAdmin):
	list_display = ['shopname', 'shoplicence', 'description', 't_user']
	class Meta:
		model = Trader

admin.site.register(Trader,TraderAdmin)

class ConsumerAdmin(admin.ModelAdmin):
	list_display = ['c_user']
	class Meta:
		model = Consumer

admin.site.register(Consumer,ConsumerAdmin)

class TraderStockInfoAdmin(admin.ModelAdmin):
	list_display = ['item_name', 'item_packs', 'items_per_pack', 'item_cost', 'notes']
	class Meta:
		model = TraderStockInfo

admin.site.register(TraderStockInfo,TraderStockInfoAdmin)
