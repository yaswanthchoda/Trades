from tradesapp.serializers import RegistrationSerializer, UserLoginSerializer, TokenSerializer, ChangePasswordSerializer, TraderSerializer, GetTraderSerializer, ConsumerSerializer, GetConsumerSerializer, TraderStockInfoSerializer, GetTraderStockInfoSerializer
from rest_framework.generics import CreateAPIView, GenericAPIView, UpdateAPIView
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from tradesapp.models import User, Trader, TraderStockInfo
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
import json

class UserRegistrationAPIView(CreateAPIView):
    
    authentication_classes = ()
    permission_classes = ()
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            self.perform_create(serializer)

            user = serializer.instance
            user.set_password(request.data['password'])
            user.save()

            token, created = Token.objects.get_or_create(user=user)
            data = serializer.data
            data["token"] = token.key

            headers = self.get_success_headers(serializer.data)
            return Response(data, status=status.HTTP_201_CREATED, headers=headers)
        except (AssertionError):
            raise serializers.ValidationError("human readable error message here")
        # except Exception as e:
        #     print(e,"pppppppp",e.status_code)
        #     return Response(json.dumps(e), status=e.status_code, headers={})


class UserLoginAPIView(GenericAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.user
            token, _ = Token.objects.get_or_create(user=user)
            s = serializer.data
            del s["password"]
            s["authtoken"] = TokenSerializer(token).data
            
            if not user.is_trader:
                s['redirect_to'] = 'consumer'
                return Response(data=s, status=status.HTTP_200_OK)
            
            try:
                inst = Trader.objects.get(t_user=user)
                s['redirect_to'] = 'trader'
                return Response(data=s, status=status.HTTP_200_OK)
            
            except ObjectDoesNotExist as odn:
                s['redirect_to'] = 'createshop'
                return Response(
                data=s,
                status=status.HTTP_200_OK
                )
        else:
            return Response(
            data=serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
            )

class ChangePasswordView(UpdateAPIView):

    serializer_class = ChangePasswordSerializer

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_200_OK)

class TraderAPIView(APIView):

  def get(self, request, pk=None, format=None):
      data = Trader.objects.filter(t_user=request.user)
      serializer = GetTraderSerializer(data, many=True)
      return Response(serializer.data)
  
  def post(self, request, *args, **kwargs):
      serializer = TraderSerializer(data=request.data)
      print(serializer.is_valid(),"---------")
      if serializer.is_valid():
        print(request.user,"from Traders views.......")
        inst = serializer.save(t_user=request.user)
        serializer = TraderSerializer(inst)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConsumerAPIView(APIView):

  def get(self, request, pk=None, format=None):
      data = Trader.objects.filter(c_user=request.user)
      serializer = GetConsumerSerializer(data, many=True)
      return Response(serializer.data)
  
  def post(self, request, *args, **kwargs):
      serializer = ConsumerSerializer(data=request.data)
      if serializer.is_valid():
        inst = serializer.save(trader_id=request.user)
        inst.save()
        serializer = ConsumerSerializer(inst)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TraderStockInfoAPIView(APIView):

  def get(self, request, pk=None, format=None):
      trader = Trader.objects.get(user=request.user)
      data = TraderStockInfo.objects.filter(trader_id__t_user=request.user)
      serializer = GetTraderStockInfoSerializer(data, many=True)
      return Response(serializer.data)
  
  def post(self, request, *args, **kwargs):
      print("888888888888888")
      serializer = TraderStockInfoSerializer(data=request.data)
      if serializer.is_valid():
        print(request.user,"from stock")
        trader = Trader.objects.get(t_user=request.user)
        inst = serializer.save(trader_id=trader)
        serializer = TraderStockInfoSerializer(inst)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

