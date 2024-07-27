import json
import random
import datetime
import requests
from bson import ObjectId

userId = '6649ad6e3204147e329206bf'
concursoId = '664b8897e935d45770ed26fc'

def generateUserId():
    return {"$oid": str(userId)}

def generateConcursoId():
    return {"$oid": str(concursoId)}

def generateSimulacaoName(simulacaoId):
    # consult API https://localhost:3000/simulacoes/{simulacaoId}
    try :
        response = requests.get(f'http://localhost:3000/simulacoes/{simulacaoId}')
        simulacao = response.json()
        print(f'http://localhost:3000/simulacoes/{simulacaoId}')
        print(simulacao)
        return simulacao['name']
    except:
        return "Simulação não encontrada"

# Carregar o JSON original
with open('studies-simulator.questions.json', 'r') as file:
    collection_data = json.load(file)

new_collection_data = []
# criar novo array de itens
for item in collection_data:
    new_item = {}
    new_item["userId"] = generateUserId()
    new_item["concursoId"] = generateConcursoId()
    new_item["simulacaoId"] = item["simulacaoId"]
    new_item["simulacaoName"] = generateSimulacaoName(item["simulacaoId"]['$oid'])
    new_item["question"] = item.copy()
    new_item["dateTime"] = datetime.datetime.now().timestamp() * 1000
    new_collection_data.append(new_item)

# Salvar o JSON modificado
with open('studies-simulator.questions_update.json', 'w') as file:
    json.dump(new_collection_data, file, ensure_ascii=False, indent=2)

print("Campos substituídos com sucesso!")
