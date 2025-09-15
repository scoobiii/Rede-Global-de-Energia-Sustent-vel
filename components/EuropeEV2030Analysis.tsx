
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Line, Area, ComposedChart, LineChart
} from 'recharts';
import type { ProductionData, ElectricityDemandData, EnergyMixData, ChargingInfraData } from '../types';

// DATA CONSTANTS
const productionData: ProductionData[] = [
  {
    category: 'Fabricantes Europeus',
    domestic: 2800000,
    imported: 0,
    share: 45.2,
    companies: ['Volkswagen Group', 'Stellantis', 'BMW', 'Mercedes-Benz', 'Volvo']
  },
  {
    category: 'Chineses na Europa',
    domestic: 1650000,
    imported: 0,
    share: 26.6,
    companies: ['BYD (Hungria)', 'Geely/Volvo', 'SAIC', 'CATL partnerships']
  },
  {
    category: 'Tesla na Europa',
    domestic: 350000,
    imported: 0,
    share: 5.6,
    companies: ['Tesla Berlin']
  },
  {
    category: 'Importações da China',
    domestic: 0,
    imported: 1400000,
    share: 22.6,
    companies: ['BYD', 'NIO', 'XPeng', 'MG Motor', 'Outros']
  }
];

const electricityDemandData: ElectricityDemandData[] = [
  { year: 2024, current: 35, projected: 35, percentage: 1.4 },
  { year: 2025, current: 50, projected: 50, percentage: 1.9 },
  { year: 2026, current: 68, projected: 68, percentage: 2.6 },
  { year: 2027, current: 85, projected: 85, percentage: 3.3 },
  { year: 2028, current: 105, projected: 105, percentage: 4.1 },
  { year: 2029, current: 125, projected: 125, percentage: 4.9 },
  { year: 2030, current: 145, projected: 145, percentage: 5.6 }
];

const energyMixData: EnergyMixData[] = [
    { source: 'Eólica', current2024: 476, projected2030: 850, internal2030: 850, external2030: 0, color: '#22C55E' },
    { source: 'Solar', current2024: 234, projected2030: 550, internal2030: 550, external2030: 0, color: '#FACC15' },
    { source: 'Nuclear', current2024: 586, projected2030: 600, internal2030: 600, external2030: 0, color: '#3B82F6' },
    { source: 'Hidro', current2024: 347, projected2030: 380, internal2030: 380, external2030: 0, color: '#06B6D4' },
    { source: 'Biomassa/Outros', current2024: 116, projected2030: 150, internal2030: 150, external2030: 0, color: '#8B5CF6' },
    {
      source: 'Gás Natural', current2024: 437, projected2030: 250, internal2030: 40, external2030: 210, color: '#F59E0B',
      externalProviders: [
        { name: 'Noruega', twh: 75, color: '#003893' },
        { name: 'EUA (GNL)', twh: 45, color: '#BF0A30' },
        { name: 'Argélia', twh: 30, color: '#006233' },
        { name: 'Qatar (GNL)', twh: 35, color: '#8D1B3D' },
        { name: 'Rússia', twh: 10, color: '#D52B1E' },
        { name: 'Outros GNL', twh: 15, color: '#808080' },
      ]
    },
    { source: 'Carvão', current2024: 301, projected2030: 80, internal2030: 15, external2030: 65, color: '#6B7280' },
    { source: 'Outros Fósseis', current2024: 75, projected2030: 40, internal2030: 5, external2030: 35, color: '#EF4444' },
];

const chargingInfraData: ChargingInfraData[] = [
  { country: 'Alemanha', points2024: 120000, points2030: 2200000, publicPoints: 220000 },
  { country: 'França', points2024: 85000, points2030: 1800000, publicPoints: 220000 },
  { country: 'Reino Unido', points2024: 65000, points2030: 1500000, publicPoints: 150000 },
  { country: 'Países Baixos', points2024: 140000, points2030: 900000, publicPoints: 90000 },
  { country: 'Itália', points2024: 45000, points2030: 1200000, publicPoints: 120000 },
  { country: 'Espanha', points2024: 25000, points2030: 800000, publicPoints: 80000 },
  { country: 'Outros UE27', points2024: 95000, points2030: 1400000, publicPoints: 140000 }
];

const naturalGasForecastData = [
    // Historical Data
    { date: 'Jan 21', price: 20, calm: null, real: null, critical: null },
    { date: 'Jul 21', price: 40, calm: null, real: null, critical: null },
    { date: 'Dez 21', price: 80, calm: null, real: null, critical: null },
    { date: 'Fev 22', price: 90, calm: null, real: null, critical: null },
    { date: 'Jun 22', price: 120, calm: null, real: null, critical: null },
    { date: 'Ago 22', price: 310, calm: null, real: null, critical: null },
    { date: 'Dez 22', price: 130, calm: null, real: null, critical: null },
    { date: 'Abr 23', price: 45, calm: null, real: null, critical: null },
    { date: 'Set 23', price: 35, calm: null, real: null, critical: null },
    { date: 'Jan 24', price: 32, calm: null, real: null, critical: null },
    { date: 'Jun 24', price: 35, calm: null, real: null, critical: null },
    // Forecast Data
    { date: 'Dez 24', price: null, calm: 30, real: 38, critical: 60 },
    { date: 'Jun 25', price: null, calm: 28, real: 45, critical: 150 },
    { date: 'Dez 25', price: null, calm: 32, real: 42, critical: 120 },
    { date: 'Jun 26', price: null, calm: 25, real: 35, critical: 80 },
    { date: 'Jun 27', price: null, calm: 24, real: 33, critical: 65 },
    { date: 'Jun 28', price: null, calm: 22, real: 30, critical: 75 },
    { date: 'Jun 29', price: null, calm: 20, real: 28, critical: 50 },
    { date: 'Dez 30', price: null, calm: 18, real: 25, critical: 45 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// HELPER COMPONENTS
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const GeneralTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          (entry.value !== null) && 
          <p key={`item-${index}`} style={{ color: entry.color || entry.fill }}>
            {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProductionTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ProductionData;
    const totalVehicles = data.domestic + data.imported;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm">
        <p className="font-bold mb-1">{data.category}</p>
        <p style={{ color: payload[0].fill }}>
          {`Share: ${data.share.toFixed(1)}%`}
        </p>
        <p style={{ color: payload[0].fill }}>
          {`Veículos: ${totalVehicles.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

const EnergyMixTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as EnergyMixData;
    const total = data.internal2030 + data.external2030;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm max-w-xs">
        <p className="font-bold mb-2">{label}</p>
        <p><strong>Total 2030:</strong> {total.toLocaleString()} TWh</p>
        <div className="mt-2 space-y-1">
          {payload.map(p => (
             <p key={p.dataKey} style={{ color: p.fill }}>{`${p.name}: ${p.value.toLocaleString()} TWh`}</p>
          ))}
        </div>
        {data.externalProviders && data.externalProviders.length > 0 && (
          <div className="mt-3 pt-2 border-t border-gray-200">
             <p className="font-semibold mb-1">Provedores Externos:</p>
             <ul className="list-disc list-inside text-gray-700">
              {data.externalProviders.map(provider => (
                <li key={provider.name}>{`${provider.name}: ${provider.twh} TWh`}</li>
              ))}
             </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
};


// MAIN COMPONENT
const EuropeEV2030Analysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('production');

  const renderContent = () => {
    switch (activeTab) {
      case 'production':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">🏭 Produção de Veículos Elétricos na Europa - Projeção 2030</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3 text-center">Distribuição da Produção (6,2 milhões VEs/ano)</h4>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={productionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="share"
                      nameKey="category"
                      labelLine={false}
                      label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {productionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ProductionTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-center">Capacidade Produtiva por Categoria</h4>
                <div className="space-y-4">
                  {productionData.map((item, index) => (
                    <div key={item.category} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{item.category}</span>
                        <span className="text-blue-600 font-bold">
                          {(item.domestic + item.imported).toLocaleString()} VEs
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${item.share}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p><strong>Principais players:</strong> {item.companies.join(', ')}</p>
                        {item.category === 'Chineses na Europa' && (
                          <p className="text-green-600 mt-1 font-semibold">✅ BYD: Planta na Hungria com 300k VEs/ano até 2030</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'demand':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">⚡ Demanda Elétrica da Mobilidade Elétrica (2024-2030)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <h4 className="font-semibold mb-3 text-center">Evolução da Demanda (TWh)</h4>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={electricityDemandData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: '% do Total', angle: 90, position: 'insideRight' }} />
                    <Tooltip content={<GeneralTooltip />} />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="current" fill="#3B82F6" stroke="#3B82F6" fillOpacity={0.6} name="Demanda VEs (TWh)" />
                    <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#F59E0B" strokeWidth={3} name="% da Demanda Total" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-2">
                 <div className="bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-2">🔢 Cálculos Base (2030):</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 30M VEs × 15.000 km/ano × 0.18 kWh/km = <strong>81 TWh</strong></li>
                    <li>• + 3M comerciais × 25k km/ano × 0.35 kWh/km = <strong>26 TWh</strong></li>
                    <li>• + Perdas de carregamento (~30%) = <strong>32 TWh</strong></li>
                    <li>• + Auxiliares (~10%) = <strong>14 TWh</strong></li>
                    <li className="font-bold pt-1 border-t border-yellow-300 mt-1">Total: ~145 TWh</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'mix':
        const gasProviders = energyMixData.find(d => d.source === 'Gás Natural')?.externalProviders || [];
        return (
           <div className="space-y-8">
            <h3 className="text-xl font-semibold text-gray-700">🔋 Matriz Energética 2030: Origem Interna vs. Externa</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={energyMixData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" angle={-45} textAnchor="end" height={100} interval={0} />
                <YAxis label={{ value: 'TWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={<EnergyMixTooltip />} />
                <Legend wrapperStyle={{paddingTop: '60px'}} />
                <Bar dataKey="internal2030" stackId="a" fill="#4ade80" name="Produção Interna (UE)" />
                <Bar dataKey="external2030" stackId="a" fill="#fb923c" name="Importado (Externo)" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                Análise Aprofundada: Gás Natural e Segurança Energética
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Origem do Gás Importado (Projeção 2030)</h5>
                   <p className="text-sm text-gray-600 mb-4">
                    Dos <strong>{gasProviders.reduce((acc, p) => acc + p.twh, 0)} TWh</strong> importados, a estratégia foca em diversificar fontes para mitigar riscos, priorizando GNL e gasodutos de parceiros estáveis.
                  </p>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={gasProviders} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip cursor={{fill: 'rgba(251, 146, 60, 0.2)'}} content={<GeneralTooltip />} />
                      <Bar dataKey="twh" name="Fornecimento (TWh)">
                        {gasProviders.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Previsão de Preços do Gás Natural e Análise de Risco (TTF)</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={naturalGasForecastData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 350]} label={{ value: 'EUR/MWh', angle: -90, position: 'insideLeft' }} />
                        <Tooltip content={<GeneralTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#020617" strokeWidth={3} name="Preço Histórico" dot={{ r: 4 }} connectNulls={false} />
                        <Line type="monotone" dataKey="real" stroke="#f59e0b" strokeWidth={2} name="Cenário Provável" strokeDasharray="5 5" dot={{ r: 4 }} connectNulls={false} />
                        <Line type="monotone" dataKey="calm" stroke="#22c55e" strokeWidth={2} name="Cenário Otimista" strokeDasharray="5 5" dot={{ r: 4 }} connectNulls={false} />
                        <Line type="monotone" dataKey="critical" stroke="#dc2626" strokeWidth={2} name="Cenário Crítico" strokeDasharray="5 5" dot={{ r: 4 }} connectNulls={false} />
                    </LineChart>
                  </ResponsiveContainer>
                   <div className="text-sm text-gray-600 mt-4 space-y-3">
                      <p>O gráfico apresenta uma simulação de previsão (estilo Prophet) com três cenários de risco para os preços do gás natural na Europa até 2030, baseados em diferentes gatilhos geopolíticos e de mercado.</p>
                      <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong className="text-green-600">Cenário Otimista:</strong> Preços baixos e estáveis, impulsionados pela rápida expansão das renováveis, invernos amenos e estabilidade no fornecimento global de GNL.</li>
                        <li><strong className="text-orange-500">Cenário Provável:</strong> Preços flutuam no "novo normal" (€35-€45), influenciados pela sazonalidade e pequenos atritos geopolíticos que não causam rupturas de oferta.</li>
                        <li><strong className="text-red-600">Cenário Crítico:</strong> Um novo pico de preços, desencadeado por um choque severo de oferta. Ex: um ataque do eixo EUA/Israel ao Irã, levando a retaliações iranianas que atingem a infraestrutura de GNL do Qatar ou bloqueiam o Estreito de Ormuz.</li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-3a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                Riscos Estratégicos da Transição
              </h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-yellow-700">
                <li><strong>Dependência de Matérias-Primas:</strong> A produção de painéis solares e turbinas eólicas depende de cadeias de suprimentos globais, muitas vezes concentradas na China, criando uma nova vulnerabilidade estratégica.</li>
                <li><strong>Intermitência das Renováveis:</strong> A geração eólica e solar é variável, exigindo investimentos massivos em armazenamento de energia (baterias) e modernização da rede para garantir a estabilidade.</li>
                <li><strong>Tensões Geopolíticas (Golfo Pérsico):</strong> Ameaças como a recente passagem de mísseis iranianos sobre o Qatar colocam em risco as rotas de transporte de GNL, um pilar da estratégia de diversificação europeia. Um bloqueio ou conflito na região poderia causar choques de preços imediatos e severos.</li>
                <li><strong>Risco Regulatório com Fornecedores-Chave:</strong> A dependência de GNL de parceiros como o Qatar cria novas vulnerabilidades. Ameaças recentes do Qatar de cortar o fornecimento de gás caso a UE aplique rigorosamente novas leis de sustentabilidade (Due Diligence) demonstram como as próprias políticas europeias podem gerar atritos e colocar em risco o fornecimento.</li>
                <li><strong>Ritmo de Construção:</strong> Atingir as metas de 2030 exige uma aceleração sem precedentes na aprovação e construção de projetos de energia renovável, enfrentando desafios de licenciamento e aceitação pública.</li>
                <li><strong>Volatilidade dos Fósseis Remanescentes:</strong> A crise de preços de 2022, causada pela guerra na Ucrânia e cortes no fornecimento russo, serve como um forte lembrete da vulnerabilidade. Mesmo com uma participação menor, a dependência de combustíveis fósseis importados continuará a expor a Europa a choques de preços semelhantes durante a transição.</li>
              </ul>
            </div>

          </div>
        );
      case 'infrastructure':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">🔌 Infraestrutura de Carregamento por País</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chargingInfraData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" angle={-45} textAnchor="end" height={80} interval={0} />
                <YAxis label={{ value: 'Pontos de Carregamento', angle: -90, position: 'insideLeft' }} tickFormatter={(tick) => `${tick/1000000}M`} />
                <Tooltip content={<GeneralTooltip />} />
                <Legend />
                <Bar dataKey="points2024" fill="#94A3B8" name="2024 Atual" />
                <Bar dataKey="points2030" fill="#22C55E" name="2030 Total Projetado" />
                <Bar dataKey="publicPoints" fill="#F59E0B" name="2030 Públicos Projetado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'analysis':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">📋 Análise Crítica & Fontes</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-3">Pontos-Chave da Análise</h4>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>
                  <strong>Dependência Estratégica:</strong> Apesar do crescimento da produção local, a Europa enfrentará uma dependência significativa de importações (22.6%), especialmente da China, e de fabricantes chineses produzindo localmente (26.6%). Isso cria um cenário competitivo complexo.
                </li>
                <li>
                  <strong>Desafio Energético Duplo:</strong> A demanda elétrica dos VEs crescerá para ~145 TWh, exigindo não só um aumento massivo na geração de energia renovável (eólica e solar), mas também uma gestão cuidadosa da transição para abandonar combustíveis fósseis, como o carvão.
                </li>
                <li>
                  <strong>Segurança Energética:</strong> A redução da dependência do gás russo é visível, com uma diversificação para GNL (EUA, Qatar) e gasodutos (Noruega, Argélia). O pico de preços de 2022 demonstrou a severidade dos riscos. Contratos de longo prazo, como os firmados com o Qatar, são essenciais, mas essa nova dependência traz seus próprios riscos, incluindo disputas regulatórias, como a ameaça do Qatar de interromper o fornecimento devido a leis de sustentabilidade da UE, transformando a segurança energética em um complexo jogo geopolítico.
                </li>
                <li>
                  <strong>Infraestrutura como Gargalo:</strong> A expansão da rede de carregamento é monumental. Países como Alemanha e França lideram, mas a meta de mais de 8.8 milhões de pontos até 2030 exige investimentos massivos e coordenação para evitar gargalos regionais.
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-3">Fontes de Dados e Projeções</h4>
              <p className="text-sm text-green-700 mb-2">
                Os dados apresentados são uma compilação e projeção baseada em relatórios de mercado e análises de agências de renome. As principais fontes incluem:
              </p>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                <li>International Energy Agency (IEA) - Global EV Outlook 2024</li>
                <li>European Automobile Manufacturers' Association (ACEA) - Production & Registration Reports</li>
                <li>Transport & Environment - EV Market Analysis Reports</li>
                <li>BloombergNEF - Long-Term Electric Vehicle Outlook</li>
                <li>ENTSO-E - Ten-Year Network Development Plan (TYNDP)</li>
                <li>Relatórios de mercado de consultorias (ex: McKinsey, BCG)</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'production', label: 'Produção', icon: '🏭' },
    { id: 'demand', label: 'Demanda', icon: '⚡' },
    { id: 'mix', label: 'Matriz Energética', icon: '🔋' },
    { id: 'infrastructure', label: 'Infraestrutura', icon: '🔌' },
    { id: 'analysis', label: 'Análise', icon: '📋' },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Análise do Mercado Europeu de Veículos Elétricos (EV) - Projeção 2030
        </h1>
        <p className="mt-2 text-md text-gray-600">
          Uma visão abrangente sobre produção, demanda energética, matriz e infraestrutura.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <nav className="flex flex-wrap border-b border-gray-200 mb-6 -mx-6 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-3 text-sm sm:text-base font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-t-md ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span className="sm:hidden">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="min-h-[500px]">
          {renderContent()}
        </div>
      </div>

      <footer className="text-center mt-8 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} EV Market Analysis. Dados compilados para fins ilustrativos.</p>
      </footer>
    </div>
  );
};

export default EuropeEV2030Analysis;
