from flask import Flask, jsonify, request
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

# 1 - Listar todas as publicações
@app.route('/dados', methods=['GET'])
def obter_dados():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM publicacao limit 10")
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 2 - Procurar artigos que contenham a palavra-chave dita pelo usuário
@app.route('/lista-palavra-chave', methods=['GET'])
def pub_palavra_chave():
    palavra = request.args.get('palavra')  # Obtém o parâmetro da query string
    if not palavra:
        return jsonify({"error": "Parâmetro 'palavra' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT * 
        FROM publicacao 
        INNER JOIN palavra_chave 
        ON publicacao.id_publicacao = palavra_chave.id_publicacao 
        WHERE palavra_chave.palavra_chave LIKE %s limit 10
    """
    cursor.execute(query, (f"%{palavra}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 3 - Contar publicações de um autor específico
@app.route('/total-publicacoes-autor', methods=['GET'])
def total_publicacoes_autor():
    nome_autor = request.args.get('nomeAutor')
    if not nome_autor:
        return jsonify({"error": "Parâmetro 'nomeAutor' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT COUNT(publicacao.titulo) AS total_publicacoes
        FROM publicacao
        INNER JOIN autor_publicacao ON publicacao.id_publicacao = autor_publicacao.id_publicacao
        INNER JOIN autor ON autor_publicacao.id_autor = autor.id_autor
        WHERE autor.nome_autor LIKE %s limit 10
    """
    cursor.execute(query, (f"%{nome_autor}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)

@app.route('/inicio', methods=['GET'])
def inicio_publicacoes():
    #nome_autor = request.args.get('nomeAutor')
    #if not nome_autor:
    #   return jsonify({"error": "Parâmetro 'nomeAutor' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
                SELECT
                p.titulo AS titulo,
                p.ano AS ano,
                GROUP_CONCAT(DISTINCT a.nome_autor ORDER BY a.nome_autor SEPARATOR ', ') AS autores,
                p.resumo_publicacao AS resumo, 
                p.url_leitura AS url_leitura,
                COUNT(DISTINCT s.id_usuario) AS total_pessoas_que_salvaram
                FROM
                    publicacao p
                LEFT JOIN
                    salva s ON p.id_publicacao = s.id_publicacao
                LEFT JOIN
                    autor_publicacao ap ON p.id_publicacao = ap.id_publicacao
                LEFT JOIN
                    autor a ON ap.id_autor = a.id_autor
                GROUP BY
                    p.id_publicacao
                ORDER BY
                    total_pessoas_que_salvaram DESC
                LIMIT 10;
    """
    #cursor.execute(query, (f"%{nome_autor}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)



# 3 - Mostrar publicações de um autor específico
@app.route('/publicacoes-autor', methods=['GET'])
def publicacoes_autor():
    nome_autor = request.args.get('nomeAutor')
    if not nome_autor:
        return jsonify({"error": "Parâmetro 'nomeAutor' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT * 
        FROM publicacao 
        INNER JOIN autor_publicacao ON publicacao.id_publicacao = autor_publicacao.id_publicacao
        INNER JOIN autor ON autor_publicacao.id_autor = autor.id_autor
        WHERE autor.nome_autor LIKE %s limit 10;
    """
    cursor.execute(query, (f"%{nome_autor}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 4 - Listar todas as publicações de um local
@app.route('/publicacoes-por-local', methods=['GET'])
def publicacoes_por_local():
    nome_local = request.args.get('nomeLocal')
    if not nome_local:
        return jsonify({"error": "Parâmetro 'nomeLocal' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT local.nome_local, local.acronimo, publicacao.titulo, publicacao.ano
        FROM local
        LEFT JOIN publicacao ON local.id_local = publicacao.id_local
        WHERE local.nome_local LIKE %s limit 10
    """
    cursor.execute(query, (f"%{nome_local}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 5 - Ano mais recente de publicação de um autor
@app.route('/ano-recente-autor', methods=['GET'])
def ano_recente_autor():
    nome_autor = request.args.get('nomeAutor')
    if not nome_autor:
        return jsonify({"error": "Parâmetro 'nomeAutor' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT autor.nome_autor, 
               (SELECT MAX(p.ano) 
                FROM publicacao p 
                JOIN autor_publicacao ap ON p.id_publicacao = ap.id_publicacao
                WHERE ap.id_autor = autor.id_autor) AS ano_mais_recente
        FROM autor 
        WHERE autor.nome_autor = %s limit 10
    """
    cursor.execute(query, (nome_autor,))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 6 - Artigos salvos por um usuário específico
@app.route('/artigos-salvos', methods=['GET'])
def artigos_salvos_usuario():
    id_usuario = request.args.get('idUsuario')
    if not id_usuario:
        return jsonify({"error": "Parâmetro 'idUsuario' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT publicacao.titulo, publicacao.id_publicacao
        FROM publicacao
        JOIN salva ON salva.id_publicacao = publicacao.id_publicacao
        JOIN usuario ON usuario.id_usuario = salva.fk_usuario_id_usuario
        WHERE usuario.id_usuario = %s
    """
    cursor.execute(query, (id_usuario,))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 7 - Quantos usuários salvaram uma publicação
@app.route('/usuarios-por-publicacao', methods=['GET'])
def usuarios_por_publicacao():
    titulo_publicacao = request.args.get('tituloPublicacao')
    if not titulo_publicacao:
        return jsonify({"error": "Parâmetro 'tituloPublicacao' é obrigatório"}), 400
    
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT publicacao.titulo,
               (SELECT COUNT(*) 
                FROM salva 
                WHERE salva.fk_publicacao_id_publicacao = publicacao.id_publicacao) AS TotalSalvaram
        FROM publicacao
        WHERE publicacao.titulo LIKE %s
    """
    cursor.execute(query, (f"%{titulo_publicacao}%",))
    resultados = cursor.fetchall()
    return jsonify(resultados)

# 8 - Total de publicações salvas por local
@app.route('/ranking-locais', methods=['GET'])
def ranking_locais():
    cursor = db.cursor(dictionary=True)
    query = """
        SELECT local.nome_local, 
               COUNT(salva.fk_publicacao_id_publicacao) AS TotalFavoritos
        FROM salva
        JOIN publicacao ON salva.fk_publicacao_id_publicacao = publicacao.id_publicacao
        JOIN local ON publicacao.id_local = local.id_local
        WHERE salva.status_favorito = 'S'
        GROUP BY local.nome_local
        ORDER BY TotalFavoritos DESC
    """
    cursor.execute(query)
    resultados = cursor.fetchall()
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
