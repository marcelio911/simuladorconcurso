import json
import random
import datetime
import requests
from bson import ObjectId

userId = '6649ad6e3204147e329206bf'
concursoId = '66a5d3d155ae53ee5f5c50a6'

def generateUserId():
    return {"$oid": str(userId)}

def generateConcursoId():
    return {"$oid": str(concursoId)}

def generateSimulacaoName(simulacaoId):
    # consult API https://localhost:3000/simulacoes/{simulacaoId}
    try :
        response = requests.get(f'https://backendsimulator.systentando.com/simulacoes/{simulacaoId}')
        simulacao = response.json()
        print(f'https://backendsimulator.systentando.com/simulacoes/{simulacaoId}')
        print(simulacao)
        return simulacao['name']
    except:
        return "Simulação não encontrada"

# Carregar o JSON original
with open('simulacoes.json', 'r') as file:
    collection_data = json.load(file)

new_collection_data = []
# criar novo array de itens
for item in collection_data:
    new_item = {}
    new_item["userId"] = generateUserId()
    new_item["concursoId"] = generateConcursoId()
    new_item["questionsId"] = []
    new_item["name"] = item['name']
    new_item["oldid"] = item['oldid']
    new_item["startTime"] = item['startTime']
    new_item["endTime"] = item['endTime']
    # new_item["simulacaoName"] = generateSimulacaoName(item["simulacaoId"]['$oid'])
    new_item["questionTimes"] = {}
    new_item["questionDifficulties"] = {}
    new_item["questionResults"] = {}
    new_item["correctAnswers"] = 0
    new_item["totalAnswers"] = 0
    new_collection_data.append(new_item)

# Salvar o JSON modificado
with open('simulacoes_update.json', 'w') as file:
    json.dump(new_collection_data, file, ensure_ascii=False, indent=2)

print("Campos substituídos com sucesso!")
