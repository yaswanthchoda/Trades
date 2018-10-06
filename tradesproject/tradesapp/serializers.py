from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from tradesapp.models import User, Trader, Consumer, TraderStockInfo

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'confirm_password', 'middle_name', 'mobile', 'zipcode', 'address', 'gender', 'is_trader')

    def create(self, validated_data):
        del validated_data["confirm_password"]
        return super(RegistrationSerializer, self).create(validated_data)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Those passwords don't match.")
        return attrs

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    default_error_messages = {
        'inactive_account': 'User account is disabled.',
        'invalid_credentials': 'Unable to login with provided credentials.'
    }

    def __init__(self, *args, **kwargs):
        super(UserLoginSerializer, self).__init__(*args, **kwargs)
        self.user = None

    def validate(self, attrs):
        self.user = authenticate(email=attrs.get("username"), password=attrs.get('password'))
        print(self.user,"pppppppppppp")
        if self.user:
            if not self.user.is_active:
                raise serializers.ValidationError(self.error_messages['inactive_account'])
            return attrs
        else:
            raise serializers.ValidationError(self.error_messages['invalid_credentials'])

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class TokenSerializer(serializers.ModelSerializer):
   auth_token = serializers.CharField(source='key')

   class Meta:
       model = Token
       fields = ("auth_token",)

class TraderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trader
        fields = ('shopname', 'shoplicence', 'description')

class GetTraderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Trader
        fields = ('pk', 'shopname', 'shoplicence', 'description', 't_user')

class ConsumerSerializer(serializers.ModelSerializer):
    
    pk = serializers.CharField()
    class Meta:
        model = Consumer
        fields = ('c_user')

class GetConsumerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Consumer
        fields = ('pk', 'c_user')

class TraderStockInfoSerializer(serializers.ModelSerializer):
    
    class Meta(object):
        model = TraderStockInfo
        fields = ('item_name', 'item_packs', 'items_per_pack', 'item_cost', 'notes')

class GetTraderStockInfoSerializer(serializers.ModelSerializer):
    
    class Meta(object):
        model = TraderStockInfo
        fields = ('item_name', 'item_packs', 'items_per_pack', 'item_cost', 'notes')

