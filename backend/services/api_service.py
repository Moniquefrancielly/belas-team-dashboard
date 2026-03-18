import requests

BASE_URL = "https://jsonplaceholder.typicode.com"

def fetch_data(endpoint):
    try:
        response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)

        response.raise_for_status()  # gera erro se for 4xx/5xx

        return response.json()

    except requests.exceptions.Timeout:
        raise Exception("Timeout: API demorou para responder")

    except requests.exceptions.HTTPError as err:
        raise Exception(f"Erro HTTP: {err.response.status_code}")

    except requests.exceptions.RequestException:
        raise Exception("Erro de conexão com a API")