from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase
from django.urls import reverse

# Create your tests here.

class TestRegister(APITestCase):

	def test_create_success(self):
		data = {'email': 'john@gmail.com', 'first_name':'john', 'last_name': 'miller', 'middle_name':'david', 'mobile':'3333333333', 'zipcode':'222222', 'address':'hyd', 'gender':'M', 'is_trader':True, 'password': 'john', 'confirm_password': 'john'}
		response = self.client.post(reverse('api-register'), data)
		print(response.status_code,"pppppppp")
		self.assertEqual(response.status_code, 201)

	def test_create_failure(self):
		data = {'email': 'john@gmail.com', 'first_name':'john', 'last_name': 'miller', 'middle_name':'david', 'mobile':'3333333333', 'zipcode':'222222', 'address':'hyd', 'gender':'M', 'is_trader':True}
		response = self.client.post(reverse('api-register'), data)
		print(response)
		self.assertEqual(response.status_code, 400)

