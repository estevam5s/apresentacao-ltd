const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = 'ltd-estacio-website';

console.log('🚀 Iniciando setup do site LTD Estácio...');

// 1. Criar pasta do projeto
if (fs.existsSync(projectName)) {
    console.log('📁 Pasta já existe, removendo...');
    fs.rmSync(projectName, { recursive: true, force: true });
}

// 2. Criar projeto React
console.log('⚛️  Criando projeto React...');
execSync(`npx create-react-app ${projectName}`, { stdio: 'inherit' });

// 3. Navegar para o diretório
process.chdir(projectName);

// 4. Instalar dependências adicionais
console.log('📦 Instalando dependências...');
execSync('npm install react-router-dom styled-components react-icons framer-motion', { stdio: 'inherit' });

// 5. Criar estrutura de pastas
const folders = ['src/components', 'src/slides', 'src/styles', 'src/assets'];
folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`📁 Pasta criada: ${folder}`);
    }
});

// 6. Criar arquivos do projeto
createAppJs();
createSlideShow();
createSlides();
createStyles();
createPackageJsonScripts();

console.log('✅ Setup concluído!');
console.log('🎯 Para executar o projeto:');
console.log(`   cd ${projectName}`);
console.log('   npm start');
console.log('🎪 O site estará disponível em http://localhost:3000');

// Executar automaticamente
console.log('🎬 Iniciando o site...');
execSync('npm start', { stdio: 'inherit' });

function createAppJs() {
    const appJs = `import React from 'react';
import './App.css';
import SlideShow from './components/SlideShow';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <SlideShow />
      </div>
    </>
  );
}

export default App;`;

    fs.writeFileSync('src/App.js', appJs);
    console.log('✏️  App.js criado');
}

function createSlideShow() {
    const slideShowJs = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import styled from 'styled-components';
import slides from '../slides/slidesData';

const SlideContainer = styled.div\`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
\`;

const SlideContent = styled(motion.div)\`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  text-align: center;
\`;

const Navigation = styled.div\`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 100;
\`;

const NavButton = styled.button\`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

const SlideCounter = styled.div\`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 500;
\`;

const FullscreenButton = styled.button\`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
\`;

const ProgressBar = styled.div\`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  transition: width 0.3s ease;
  width: \${props => (props.current / (props.total - 1)) * 100}%;
\`;

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide]);

  return (
    <SlideContainer>
      <FullscreenButton onClick={toggleFullscreen}>
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </FullscreenButton>

      <AnimatePresence mode="wait">
        <SlideContent
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentSlide]}
        </SlideContent>
      </AnimatePresence>

      <Navigation>
        <NavButton 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
        >
          <FaChevronLeft />
        </NavButton>
        
        <SlideCounter>
          {currentSlide + 1} / {slides.length}
        </SlideCounter>
        
        <NavButton 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
        >
          <FaChevronRight />
        </NavButton>
      </Navigation>

      <ProgressBar current={currentSlide} total={slides.length} />
    </SlideContainer>
  );
};

export default SlideShow;`;

    fs.writeFileSync('src/components/SlideShow.js', slideShowJs);
    console.log('✏️  SlideShow.js criado');
}

function createSlides() {
    const slidesData = `import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaReact, FaMobile, FaCloud, FaStore, FaGlobe } from 'react-icons/fa';

const SlideWrapper = styled.div\`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
\`;

const Title = styled.h1\`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
\`;

const Subtitle = styled.h2\`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
\`;

const Text = styled.p\`
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
\`;

const List = styled.ul\`
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 800px;
  text-align: left;
  
  li {
    margin-bottom: 0.5rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
\`;

const IconGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
\`;

const IconCard = styled.div\`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
\`;

const Icon = styled.div\`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
\`;

const slides = [
  // Slide 1 - Título
  <SlideWrapper>
    <Title>LTD - Laboratório de Transformação Digital</Title>
    <Subtitle>Faculdade Estácio</Subtitle>
    <Text>Uma parceria estratégica entre Universidade e Prefeitura Municipal</Text>
  </SlideWrapper>,

  // Slide 2 - Sobre o LTD
  <SlideWrapper>
    <Subtitle>O que é o LTD?</Subtitle>
    <Text>
      O Laboratório de Transformação Digital é uma iniciativa inovadora que representa 
      uma parceria estratégica entre a Faculdade Estácio e a Prefeitura Municipal.
    </Text>
    <List>
      <li>🎯 Implementação de soluções tecnológicas inovadoras</li>
      <li>👨‍💻 Capacitação de servidores públicos em tecnologias emergentes</li>
      <li>🔬 Pesquisa e desenvolvimento em transformação digital</li>
      <li>🤝 Ponte entre academia e setor público</li>
    </List>
  </SlideWrapper>,

  // Slide 3 - Site LTD Estácio
  <SlideWrapper>
    <Subtitle>Portal LTD Estácio</Subtitle>
    <Text style={{fontSize: '2rem', color: '#FFD700'}}>www.ltdestacio.com.br</Text>
    <Text>
      Nosso portal centraliza todas as ferramentas, softwares e sistemas desenvolvidos 
      pelo laboratório, abrangendo diversas áreas da tecnologia.
    </Text>
    <IconGrid>
      <IconCard>
        <Icon><FaReact /></Icon>
        <h3>Desenvolvido em ReactJS</h3>
        <p>Interface moderna e responsiva</p>
      </IconCard>
      <IconCard>
        <Icon><FaGlobe /></Icon>
        <h3>Domínio Registro.br</h3>
        <p>Alternativa: GoDaddy</p>
      </IconCard>
    </IconGrid>
  </SlideWrapper>,

  // Slide 4 - App de Currículo
  <SlideWrapper>
    <Subtitle>App Gerador de Currículo</Subtitle>
    <Text>
      Desenvolvemos um aplicativo móvel para geração automática de currículos, 
      utilizando as mais modernas tecnologias de desenvolvimento mobile.
    </Text>
    <IconGrid>
      <IconCard>
        <Icon><FaMobile /></Icon>
        <h3>React Native + Expo</h3>
        <p>Multiplataforma (Android & iOS)</p>
      </IconCard>
      <IconCard>
        <Icon><FaCloud /></Icon>
        <h3>Deploy Automatizado</h3>
        <p>Script próprio para build e deploy</p>
      </IconCard>
    </IconGrid>
  </SlideWrapper>,

  // Slide 5 - Processo de Deploy
  <SlideWrapper>
    <Subtitle>Processo de Deploy Mobile</Subtitle>
    <List>
      <li>📱 Desenvolvimento com React Native e Expo</li>
      <li>⚙️ Script personalizado para geração de APK</li>
      <li>☁️ Deploy automático para o site do Expo</li>
      <li>📥 Download do APK gerado</li>
      <li>🏪 Publicação na Google Play Store</li>
    </List>
    <Text style={{marginTop: '2rem', fontSize: '1.2rem', color: '#FFD700'}}>
      💰 Custo: Conta de desenvolvedor Google Play - $25/ano
    </Text>
  </SlideWrapper>,

  // Slide 6 - Plataforma Expo
  <SlideWrapper>
    <Subtitle>Como Utilizar a Plataforma Expo</Subtitle>
    <List>
      <li>🚀 Desenvolvimento rápido e eficiente</li>
      <li>📲 Testes em tempo real no dispositivo</li>
      <li>🔧 Build automático para Android e iOS</li>
      <li>📦 Distribuição facilitada via Expo Store</li>
      <li>🔄 Atualizações over-the-air (OTA)</li>
    </List>
    <Text style={{marginTop: '2rem'}}>
      A plataforma Expo simplifica significativamente o processo de desenvolvimento 
      e distribuição de aplicativos móveis.
    </Text>
  </SlideWrapper>,

  // Slide 7 - Google Play Store
  <SlideWrapper>
    <Subtitle>Publicação na Google Play Store</Subtitle>
    <IconCard style={{maxWidth: '600px'}}>
      <Icon><FaStore /></Icon>
      <h3>Processo de Publicação</h3>
      <List style={{textAlign: 'left', marginTop: '1rem'}}>
        <li>Conta de desenvolvedor Google Play ($25)</li>
        <li>Preparação do APK/AAB</li>
        <li>Configuração da listagem da loja</li>
        <li>Testes e aprovação</li>
        <li>Lançamento para usuários</li>
      </List>
    </IconCard>
  </SlideWrapper>,

  // Slide 8 - GitHub Organization
  <SlideWrapper>
    <Subtitle>Organização no GitHub</Subtitle>
    <Text>
      Todo o código-fonte dos projetos do LTD está organizado em nossa 
      organização oficial no GitHub, separado por áreas de tecnologia.
    </Text>
    <IconGrid>
      <IconCard>
        <Icon><FaGithub /></Icon>
        <h3>Repositórios Organizados</h3>
        <p>Separados por área tecnológica</p>
      </IconCard>
      <IconCard>
        <Icon><FaReact /></Icon>
        <h3>Tecnologias Diversas</h3>
        <p>Web, Mobile, Backend, IA</p>
      </IconCard>
    </IconGrid>
    <Text style={{marginTop: '2rem', fontSize: '1.2rem'}}>
      🔗 Acesso colaborativo para toda a equipe do laboratório
    </Text>
  </SlideWrapper>,

  // Slide 9 - Tecnologias Utilizadas
  <SlideWrapper>
    <Subtitle>Stack Tecnológico</Subtitle>
    <IconGrid>
      <IconCard>
        <h4>Frontend</h4>
        <p>ReactJS, React Native, HTML5, CSS3, JavaScript</p>
      </IconCard>
      <IconCard>
        <h4>Mobile</h4>
        <p>React Native, Expo, Android SDK, iOS</p>
      </IconCard>
      <IconCard>
        <h4>Deploy & Hosting</h4>
        <p>Expo, Google Play Store, Registro.br</p>
      </IconCard>
      <IconCard>
        <h4>Controle de Versão</h4>
        <p>Git, GitHub Organizations</p>
      </IconCard>
    </IconGrid>
  </SlideWrapper>,

  // Slide 10 - Agradecimentos
  <SlideWrapper>
    <Title>Obrigado!</Title>
    <Text>LTD - Laboratório de Transformação Digital</Text>
    <Text>Faculdade Estácio</Text>
    <Text style={{marginTop: '3rem', fontSize: '1.2rem', color: '#FFD700'}}>
      🌐 www.ltdestacio.com.br
    </Text>
    <Text style={{fontSize: '1rem', marginTop: '2rem'}}>
      Pressione F11 para tela cheia | Use setas para navegar
    </Text>
  </SlideWrapper>
];

export default slides;`;

    fs.writeFileSync('src/slides/slidesData.js', slidesData);
    console.log('✏️  slidesData.js criado');
}

function createStyles() {
    const globalStyles = `import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }

  .App {
    width: 100%;
    height: 100%;
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
\`;

export default GlobalStyles;`;

    fs.writeFileSync('src/styles/GlobalStyles.js', globalStyles);
    console.log('✏️  GlobalStyles.js criado');
}

function createPackageJsonScripts() {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    packageJson.scripts = {
        ...packageJson.scripts,
        "build-deploy": "npm run build && echo 'Build concluído! Pronto para deploy'",
        "dev": "npm start"
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✏️  Scripts do package.json atualizados');
}