from django.test import TestCase
from django.test.client import RequestFactory
from routine_manager.views import index

class SimpleTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_details(self):
        # Create an instance of a GET request.
        request = self.factory.get('/routine_manager/')

        # Test my_view() as if it were deployed at /customer/details
        response = index(request)
        self.assertEqual(response.status_code, 200)
    