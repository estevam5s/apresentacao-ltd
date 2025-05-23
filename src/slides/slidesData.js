import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaReact, FaMobile, FaCloud, FaStore, FaGlobe } from 'react-icons/fa';

const SlideWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Text = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const List = styled.ul`
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 800px;
  text-align: left;
  
  li {
    margin-bottom: 0.5rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2rem;
`;

const IconCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
`;

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

export default slides;