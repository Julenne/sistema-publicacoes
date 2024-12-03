from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Permite que o React consuma a API

# Conexão com o banco de dados
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Senha@123",  # Atualize com sua senha
    database="sistema_publicacoes",  # Seu banco de dados
    port=3306
)

@app.route('/dados', methods=['GET'])
def obter_dados():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM publicacao")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#procurar artigos que contenham a palavra chave dita pelo usuário
@app.route('/lista-palavra-chave', methods=['GET'])
def pub_palavra_chave(palavra):
    id = request.args.get('palavra')
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT * FROM publicacao 
                        INNER JOIN palavra_chave 
                        ON publicacao.id_publicacao = palavra_chave.id_publicacao 
                        WHERE palavra_chave.palavra_chave LIKE '%{palavra}%'")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#conta quantas publicações aquele autor possui(vai aparecer essa info na busca)
@app.route('/total-publicacoes-autorEsp', methods=['GET'])
def publicacoes_autor(nomeAutor):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT COUNT(publicacao.titulo) AS total_publicacoes
                        FROM publicacao
                        INNER JOIN autor_publicacao ON publicacao.id_publicacao = autor_publicacao.id_publicacao
                        INNER JOIN autor ON autor_publicacao.id_autor = autor.id_autor
                        WHERE autor.nome_autor LIKE '%{nomeAutor}%';")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#listar todas as publicações de um local (usando junção externa pois assim incluiremos os locais que não possuem publicação)
@app.route('/dados', methods=['GET'])
def obter_dados():
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT local.nome_local, local.acronimo, publicacao.titulo, publicacao.ano
                        FROM local
                        LEFT JOIN publicacao ON local.id_local = publicacao.id_local
                        WHERE local.nome_local LIKE '%nomeLocal%' ")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#lista o autor indicado na pesquisa e o ano mais recente em que ele publicou algo

@app.route('/dados', methods=['GET'])
def obter_dados():
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT autor.nome_autor, 
                    (SELECT MAX(p.ano) 
                    FROM publicacao p 
                    JOIN autor_publicacao ap ON p.id_publicacao = ap.id_publicacao
                    WHERE ap.id_autor = autor.id_autor) AS ano_mais_recente
                    FROM autor 
                    WHERE autor.nome_autor = 'nomeAutor';")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#procurar os artigos salvos por um usuário específico:
@app.route('/dados', methods=['GET'])
def obter_dados(valorID):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT publicacao.titulo, publicacao.id_publicacao
                        FROM publicacao
                        JOIN salva ON salva.id_publicacao = publicacao.id_publicacao
                        JOIN usuario ON usuario.id_usuario = salva.id_usuario
                        WHERE usuario.id_usuario = {valorID};")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#quantos usuarios salvaram tal publicação
@app.route('/dados', methods=['GET'])
def obter_dados(tituloPublicacao):
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT publicacao.titulo,
                        (SELECT COUNT(*) 
                        FROM salva 
                        WHERE salva.id_publicacao = publicacao.id_publicacao) AS TotalSalvaram
                        FROM publicacao
                        WHERE publicacao.titulo LIKE '%{tituloPublicacao}%'; ")
    resultados = cursor.fetchall()
    return jsonify(resultados)

#diz o total de publicações salvas por local de publicação (para fazer um ranking)
@app.route('/dados', methods=['GET'])
def obter_dados():
    cursor = db.cursor(dictionary=True)
    cursor.execute(f"SELECT local.nome_local, 
                        COUNT(salva.id_publicacao) AS TotalFavoritos
                        FROM salva
                        JOIN publicacao ON salva.id_publicacao = publicacao.id_publicacao
                        JOIN local ON publicacao.id_local = local.id_local
                        WHERE salva.status_favorito = 'S'
                        GROUP BY local.nome_local
                        ORDER BY TotalFavoritos DESC;")
    resultados = cursor.fetchall()
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
