CREATE DATABASE laboratorio_bromatologia DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE laboratorio_bromatologia;

-- TABELAS GERAIS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    tipo_usuario ENUM('admin', 'editor', 'visitante') DEFAULT 'visitante',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE configuracoes_site (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150),
    telefone VARCHAR(50),
    endereco TEXT
);

CREATE TABLE redes_sociais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    icone VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE menu_navegacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    url VARCHAR(255),
    ordem INT
);

CREATE TABLE footer_widgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('logo', 'links_rapidos', 'links_uteis', 'boletim'),
    titulo VARCHAR(100),
    conteudo TEXT
);

CREATE TABLE midia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_arquivo VARCHAR(255),
    caminho VARCHAR(255),
    tipo ENUM('imagem', 'pdf', 'outro'),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PÁGINA INDEX
CREATE TABLE secao_hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    subtitulo VARCHAR(255),
    descricao TEXT,
    botao1_texto VARCHAR(100),
    botao2_texto VARCHAR(100),
    imagem_id INT,
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

CREATE TABLE cards_features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descricao TEXT,
    icone VARCHAR(50)
);

CREATE TABLE secao_about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    paragrafo1 TEXT,
    paragrafo2 TEXT,
    imagem_id INT,
    botao_texto VARCHAR(100),
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

CREATE TABLE estatisticas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(50),
    descricao VARCHAR(100)
);

CREATE TABLE projetos_destaque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    ordem INT
);

-- PÁGINA SOBRE
CREATE TABLE secao_historia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    paragrafo1 TEXT,
    paragrafo2 TEXT,
    paragrafo3 TEXT,
    imagem_id INT,
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

CREATE TABLE missao_visao_valores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('missao', 'visao', 'valores'),
    icone VARCHAR(50),
    texto TEXT
);

CREATE TABLE valores_lista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor TEXT
);

CREATE TABLE equipamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT
);

-- EQUIPE
CREATE TABLE membros_equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(100),
    biografia TEXT,
    especialidade VARCHAR(100),
    imagem_id INT,
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

-- PROJETOS
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100),
    titulo VARCHAR(255),
    coordenador_id INT,
    periodo VARCHAR(50),
    financiamento VARCHAR(100),
    descricao TEXT,
    imagem_id INT,
    status ENUM('em_andamento', 'concluido') DEFAULT 'em_andamento',
    FOREIGN KEY (coordenador_id) REFERENCES membros_equipe(id),
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

CREATE TABLE resultados_projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projeto_id INT,
    resultado TEXT,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

CREATE TABLE parcerias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imagem_id INT,
    descricao TEXT,
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

-- PUBLICAÇÕES
CREATE TABLE publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    autores TEXT,
    revista VARCHAR(255),
    ano INT,
    resumo TEXT,
    link_pdf VARCHAR(255),
    link_doi VARCHAR(255)
);

CREATE TABLE filtros_publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('ano', 'categoria', 'autor'),
    valor VARCHAR(100)
);

CREATE TABLE tags_publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publicacao_id INT,
    tag VARCHAR(100),
    FOREIGN KEY (publicacao_id) REFERENCES publicacoes(id)
);

-- CONTATO
CREATE TABLE informacoes_contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('endereco', 'telefone', 'email', 'horario'),
    icone VARCHAR(50),
    conteudo TEXT
);

CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pergunta TEXT,
    resposta TEXT
);

CREATE TABLE mensagens_contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(50),
    assunto VARCHAR(100),
    mensagem TEXT,
    aceite_politica BOOLEAN,
    enviado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    inscrito_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONFIGURAÇÕES EXTRAS
CREATE TABLE banners_paginas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pagina ENUM('index', 'sobre', 'projetos', 'publicacoes', 'contato'),
    titulo VARCHAR(255),
    breadcrumb VARCHAR(255),
    imagem_id INT,
    FOREIGN KEY (imagem_id) REFERENCES midia(id)
);

CREATE TABLE secoes_textos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    secao VARCHAR(100),
    titulo VARCHAR(255),
    subtitulo VARCHAR(255),
    conteudo TEXT
);

CREATE TABLE breadcrumbs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pagina ENUM('index', 'sobre', 'projetos', 'publicacoes', 'contato'),
    caminho VARCHAR(255)
);

