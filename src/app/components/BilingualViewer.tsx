import { useState } from 'react';
import { ArrowLeft, BookOpen, Type, Download, Sparkles, Sun, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface BilingualViewerProps {
  onBack: () => void;
  onGoHome: () => void;
}

// Contenido completo de Las Metamorfosis dividido en 4 páginas
const pages = [
  {
    // Frame 1: Versos 1-20 (El Caos)
    title: "El Caos",
    verseRange: "1-20",
    highlightedLine: 7,
    lines: [
      {
        line: 1,
        latin: "In nova fert animus mutatas dicere formas",
        spanish: "Mi ánimo me lleva a decir las formas cambiadas en nuevos cuerpos"
      },
      {
        line: 2,
        latin: "corpora; di, coeptis (nam vos mutastis et illas)",
        spanish: "dioses, favoreced mis empresas (pues vosotros también las transformasteis)"
      },
      {
        line: 3,
        latin: "adspirate meis primaque ab origine mundi",
        spanish: "e inspirad mi canto desde el primer origen del mundo"
      },
      {
        line: 4,
        latin: "ad mea perpetuum deducite tempora carmen!",
        spanish: "hasta mis tiempos en un poema continuo"
      },
      {
        line: 5,
        latin: "Ante mare et terras et quod tegit omnia caelum",
        spanish: "Antes del mar y las tierras y el cielo que todo lo cubre"
      },
      {
        line: 6,
        latin: "unus erat toto naturae vultus in orbe,",
        spanish: "uno era el aspecto de la naturaleza en todo el orbe,"
      },
      {
        line: 7,
        latin: "quem dixere chaos: rudis indigestaque moles",
        spanish: "al que llamaron caos: masa tosca e informe"
      },
      {
        line: 8,
        latin: "nec quicquam nisi pondus iners congestaque eodem",
        spanish: "y nada sino peso inerte y amontonadas en el mismo lugar"
      },
      {
        line: 9,
        latin: "non bene iunctarum discordia semina rerum.",
        spanish: "las semillas discordes de las cosas mal unidas."
      },
      {
        line: 10,
        latin: "Nullus adhuc mundo praebebat lumina Titan,",
        spanish: "Ningún Titán ofrecía aún sus luces al mundo,"
      },
      {
        line: 11,
        latin: "nec nova crescendo reparabat cornua Phoebe,",
        spanish: "ni Febe restauraba sus cuernos al crecer de nuevo,"
      },
      {
        line: 12,
        latin: "nec circumfuso pendebat in aere tellus",
        spanish: "ni la tierra pendía en el aire que la envolvía"
      },
      {
        line: 13,
        latin: "ponderibus librata suis, nec bracchia longo",
        spanish: "equilibrada por sus propios pesos, ni los brazos"
      },
      {
        line: 14,
        latin: "margine terrarum porrexerat Amphitrite.",
        spanish: "de Anfítrite se extendían por el largo margen de las tierras."
      },
      {
        line: 15,
        latin: "Utque erat et tellus illic et pontus et aer,",
        spanish: "Y aunque allí había tierra, mar y aire,"
      },
      {
        line: 16,
        latin: "sic erat instabilis tellus, innabilis unda,",
        spanish: "así era inestable la tierra, innavegable la onda,"
      },
      {
        line: 17,
        latin: "lucis egens aer; nulli sua forma manebat,",
        spanish: "el aire carecía de luz; ninguna cosa conservaba su forma,"
      },
      {
        line: 18,
        latin: "obstabatque aliis aliud, quia corpore in uno",
        spanish: "y se estorbaban unas a otras, porque en un solo cuerpo"
      },
      {
        line: 19,
        latin: "frigida pugnabant calidis, umentia siccis,",
        spanish: "luchaban lo frío con lo cálido, lo húmedo con lo seco,"
      },
      {
        line: 20,
        latin: "mollia cum duris, sine pondere habentia pondus.",
        spanish: "lo blando con lo duro, lo sin peso con lo que tenía peso."
      }
    ]
  },
  {
    // Frame 2: Versos 21-40 (La creación del hombre)
    title: "La Creación del Orden",
    verseRange: "21-40",
    highlightedLine: 28,
    lines: [
      {
        line: 21,
        latin: "Hanc deus et melior litem natura diremit.",
        spanish: "Esta contienda la deshizo un dios y una naturaleza mejor."
      },
      {
        line: 22,
        latin: "Nam caelo terras et terris abscidit undas",
        spanish: "Pues separó del cielo las tierras, y de las tierras las aguas"
      },
      {
        line: 23,
        latin: "et liquidum spisso secrevit ab aere caelum.",
        spanish: "y apartó el cielo líquido del aire espeso."
      },
      {
        line: 24,
        latin: "Quae postquam evolvit caecoque exemit acervo,",
        spanish: "Y después que desenrolló estas cosas y las sacó del ciego montón,"
      },
      {
        line: 25,
        latin: "dissociata locis concordi pace ligavit.",
        spanish: "las ató, disociadas en lugares, con paz concordante."
      },
      {
        line: 26,
        latin: "Ignea convexi vis et sine pondere caeli",
        spanish: "La fuerza ígnea del convexo cielo, sin peso,"
      },
      {
        line: 27,
        latin: "emicuit summaque locum sibi fecit in arce;",
        spanish: "brilló y se hizo lugar para sí en la cima más alta;"
      },
      {
        line: 28,
        latin: "proximus est aer illi levitate locoque;",
        spanish: "el aire está más próximo a él en ligereza y lugar;"
      },
      {
        line: 29,
        latin: "densior his tellus elementaque grandia traxit",
        spanish: "más densa que estos, la tierra atrajo los elementos pesados"
      },
      {
        line: 30,
        latin: "et pressa est gravitate sua; circumfluus umor",
        spanish: "y fue comprimida por su propio peso; el agua que fluye alrededor"
      },
      {
        line: 31,
        latin: "ultima possedit solidumque coercuit orbem.",
        spanish: "ocupó el último lugar y ciñó el sólido orbe."
      },
      {
        line: 32,
        latin: "Sic ubi dispositam quisquis fuit ille deorum",
        spanish: "Así, cuando quienquiera que fuese aquel de los dioses"
      },
      {
        line: 33,
        latin: "congeriem secuit sectamque in membra redegit,",
        spanish: "cortó el montón dispuesto y lo redujo, cortado, en miembros,"
      },
      {
        line: 34,
        latin: "principio terram, ne non aequalis ab omni",
        spanish: "en primer lugar, para que la tierra no fuera desigual por todas"
      },
      {
        line: 35,
        latin: "parte foret, magni speciem glomeravit in orbis.",
        spanish: "partes, la aglomeró en forma de gran orbe."
      },
      {
        line: 36,
        latin: "Tum freta diffundi rapidisque tumescere ventis",
        spanish: "Luego mandó que los estrechos se extendieran e hincharan con rápidos vientos"
      },
      {
        line: 37,
        latin: "iussit et ambitae circumdare litora terrae;",
        spanish: "y rodearan las playas de la tierra circundada;"
      },
      {
        line: 38,
        latin: "addidit et fontes et stagna immensa lacusque",
        spanish: "añadió también fuentes y estanques inmensos y lagos"
      },
      {
        line: 39,
        latin: "fecitque in summo fluvios pelagoque remoto,",
        spanish: "e hizo que en lo alto hubiera ríos, y en el alejado piélago,"
      },
      {
        line: 40,
        latin: "qui diversis currentibus, partim ab ipso.",
        spanish: "que corriendo por diversos lugares, en parte por la tierra misma."
      }
    ]
  },
  {
    // Frame 3: Versos 41-60 (Los cuatro vientos y zonas)
    title: "Los Vientos y las Zonas",
    verseRange: "41-60",
    highlightedLine: 52,
    lines: [
      {
        line: 41,
        latin: "Neve regio foret ulla suis animalibus orba,",
        spanish: "Y para que ninguna región careciera de sus propios animales,"
      },
      {
        line: 42,
        latin: "astra tenent caeleste solum formaeque deorum,",
        spanish: "los astros ocupan el suelo celeste y las formas de los dioses,"
      },
      {
        line: 43,
        latin: "cessere nitentibus undis habitandaque pisces,",
        spanish: "cedieron a las brillantes ondas los peces para habitarlas,"
      },
      {
        line: 44,
        latin: "terra feras cepit, volucres agitabilis aer.",
        spanish: "la tierra recibió las fieras, el aire agitable las aves."
      },
      {
        line: 45,
        latin: "Sanctius his animal mentisque capacius altae",
        spanish: "Un animal más santo que estos y capaz de una mente más alta"
      },
      {
        line: 46,
        latin: "deerat adhuc et quod dominari in cetera posset:",
        spanish: "faltaba aún, uno que pudiera dominar sobre todo lo demás:"
      },
      {
        line: 47,
        latin: "natus homo est, sive hunc divino semine fecit",
        spanish: "nació el hombre, bien lo hizo de semilla divina"
      },
      {
        line: 48,
        latin: "ille opifex rerum, mundi melioris origo,",
        spanish: "aquel artífice del mundo, origen de un mundo mejor,"
      },
      {
        line: 49,
        latin: "sive recens tellus seductaque nuper ab alto",
        spanish: "o bien la tierra reciente, separada hace poco del alto"
      },
      {
        line: 50,
        latin: "aethere cognati retinebat semina caeli.",
        spanish: "éter, conservaba semillas del cielo emparentado."
      },
      {
        line: 51,
        latin: "Quam satus Iapeto mixtam pluvialibus undis",
        spanish: "Esta tierra, el hijo de Jápeto, mezclada con aguas pluviales,"
      },
      {
        line: 52,
        latin: "finxit in effigiem moderantum cuncta deorum,",
        spanish: "la modeló a imagen de los dioses que todo lo moderan,"
      },
      {
        line: 53,
        latin: "pronaque cum spectent animalia cetera terram,",
        spanish: "y mientras los demás animales miran inclinados hacia la tierra,"
      },
      {
        line: 54,
        latin: "os homini sublime dedit caelumque videre",
        spanish: "dio al hombre un rostro levantado y le mandó ver el cielo"
      },
      {
        line: 55,
        latin: "iussit et erectos ad sidera tollere vultus:",
        spanish: "y alzar erguido el semblante hacia los astros:"
      },
      {
        line: 56,
        latin: "sic, modo quae fuerat rudis et sine imagine, tellus",
        spanish: "así, la tierra que antes había sido tosca y sin figura,"
      },
      {
        line: 57,
        latin: "induit ignotas hominum conversa figuras.",
        spanish: "transformada, se vistió de las desconocidas figuras de los hombres."
      },
      {
        line: 58,
        latin: "Aurea prima sata est aetas, quae vindice nullo,",
        spanish: "La edad de oro fue la primera que nació, la cual sin vengador alguno,"
      },
      {
        line: 59,
        latin: "sponte sua, sine lege fidem rectumque colebat.",
        spanish: "por su propia voluntad, sin ley, cultivaba la fe y lo recto."
      },
      {
        line: 60,
        latin: "Poena metusque aberant, nec verba minantia fixo",
        spanish: "El castigo y el miedo estaban ausentes, ni palabras amenazantes grabadas"
      }
    ]
  },
  {
    // Frame 4: Versos 61-80 (La edad de oro)
    title: "La Edad de Oro",
    verseRange: "61-80",
    highlightedLine: 70,
    lines: [
      {
        line: 61,
        latin: "aere legebantur, nec verba minantia fixo",
        spanish: "en bronce se leían, ni las turbas suplicantes temían"
      },
      {
        line: 62,
        latin: "aere legebantur, nec supplex turba timebat",
        spanish: "las palabras de su juez; estaban seguros sin vengador."
      },
      {
        line: 63,
        latin: "iudicis ora sui, sed erant sine vindice tuti.",
        spanish: "No había sido cortado el pino de sus montañas para descender"
      },
      {
        line: 64,
        latin: "Nondum caesa suis, peregrinum ut viseret orbem,",
        spanish: "a las líquidas ondas y visitar un mundo extranjero,"
      },
      {
        line: 65,
        latin: "montibus in liquidas pinus descenderat undas,",
        spanish: "ni los mortales conocían otras playas que las suyas."
      },
      {
        line: 66,
        latin: "nullaque mortales praeter sua litora norant.",
        spanish: "Aún no había profundas fosas alrededor de las ciudades empinadas,"
      },
      {
        line: 67,
        latin: "Nondum praecipites cingebant oppida fossae;",
        spanish: "ni trompetas rectas, ni cuernos de bronce curvo,"
      },
      {
        line: 68,
        latin: "non tuba directi, non aeris cornua flexi,",
        spanish: "ni cascos, ni espadas había: sin necesidad de soldados,"
      },
      {
        line: 69,
        latin: "non galeae, non ensis erant; sine militis usu",
        spanish: "las gentes vivían seguras en ocio blando."
      },
      {
        line: 70,
        latin: "mollia securae peragebant otia gentes.",
        spanish: "La tierra misma también, libre, no tocada por el azadón,"
      },
      {
        line: 71,
        latin: "Ipsa quoque immunis rastroque intacta nec ullis",
        spanish: "ni herida por ningún arado, daba todo por sí misma;"
      },
      {
        line: 72,
        latin: "saucia vomeribus per se dabat omnia tellus;",
        spanish: "y contentos con los alimentos creados sin violencia,"
      },
      {
        line: 73,
        latin: "contentique cibis nullo cogente creatis",
        spanish: "recogían los frutos del madroño, las fresas de los montes,"
      },
      {
        line: 74,
        latin: "arbuteos fetus montanaque fraga legebant",
        spanish: "las cerezas silvestres y las moras que se agarraban"
      },
      {
        line: 75,
        latin: "cornaque et in duris haerentia mora rubetis",
        spanish: "a las espinosas zarzas, y las bellotas caídas"
      },
      {
        line: 76,
        latin: "et quae deciderant patula Iovis arbore glandes.",
        spanish: "del ancho árbol de Júpiter."
      },
      {
        line: 77,
        latin: "Ver erat aeternum, placidique tepentibus auris",
        spanish: "Era eterna la primavera, y con plácidos soplos"
      },
      {
        line: 78,
        latin: "mulcebant zephyri natos sine semine flores;",
        spanish: "los céfiros acariciaban las flores nacidas sin semilla;"
      },
      {
        line: 79,
        latin: "mox etiam fruges tellus inarata ferebat,",
        spanish: "pronto también la tierra sin arar producía las mieses,"
      },
      {
        line: 80,
        latin: "nec renovatus ager gravidis canebat aristis.",
        spanish: "y el campo sin renovar blanqueaba con las pesadas espigas."
      }
    ]
  }
];

export function BilingualViewer({ onBack, onGoHome }: BilingualViewerProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [brightness, setBrightness] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Simulación de múltiples páginas

  // Línea resaltada automáticamente para demostrar alineación IA
  const aiHighlightedLine = pages[currentPage - 1].highlightedLine;

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    // Aquí se activaría el análisis morfológico
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: '#F5F5DC',
        filter: `brightness(${brightness}%)`
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--parchment)' }}>
        {/* Top bar with logo */}
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-all duration-200"
            style={{ color: 'var(--ink-charcoal)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onGoHome}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--ink-charcoal)' }} />
            <span style={{
              fontFamily: 'Baskerville, "Libre Baskerville", "Playfair Display", Georgia, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1.25rem',
              fontWeight: '700',
              letterSpacing: '0.02em'
            }}>
              Scrinium
            </span>
          </button>
          <div style={{ width: '32px' }}></div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.1)' }}>
          <div className="flex gap-2">
            {/* Text Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-3 py-1.5 rounded transition-all duration-200"
                style={{
                  backgroundColor: showSettings ? 'rgba(43, 37, 32, 0.05)' : 'transparent',
                  border: '1px solid rgba(43, 37, 32, 0.2)',
                  color: 'var(--ink-charcoal)',
                  fontFamily: 'Georgia, Garamond, serif',
                  fontSize: '0.85rem'
                }}
              >
                <Type className="w-4 h-4" strokeWidth={1.5} />
                <span>Ajustes</span>
              </button>

              {showSettings && (
                <div 
                  className="absolute top-full left-0 mt-2 p-4 rounded-lg shadow-xl z-50"
                  style={{
                    backgroundColor: 'var(--parchment)',
                    border: '1px solid var(--gold-accent)',
                    minWidth: '200px'
                  }}
                >
                  <div className="mb-4">
                    <p className="mb-2" style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      color: 'var(--ink-charcoal)',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      Tamaño de texto
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={decreaseFontSize}
                        className="p-1.5 rounded transition-all duration-200"
                        style={{
                          backgroundColor: 'rgba(43, 37, 32, 0.05)',
                          color: 'var(--ink-charcoal)'
                        }}
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span style={{
                        fontFamily: 'Georgia, Garamond, serif',
                        color: 'var(--ink-charcoal)',
                        fontSize: '0.85rem'
                      }}>
                        {fontSize}px
                      </span>
                      <button
                        onClick={increaseFontSize}
                        className="p-1.5 rounded transition-all duration-200"
                        style={{
                          backgroundColor: 'rgba(43, 37, 32, 0.05)',
                          color: 'var(--ink-charcoal)'
                        }}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2" style={{
                      fontFamily: 'Georgia, Garamond, serif',
                      color: 'var(--ink-charcoal)',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      Brillo
                    </p>
                    <input
                      type="range"
                      min="70"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Export Notes */}
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded transition-all duration-200"
              style={{
                border: '1px solid rgba(43, 37, 32, 0.2)',
                color: 'var(--ink-charcoal)',
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.85rem'
              }}
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              <span>Exportar notas</span>
            </button>

            {/* AI Analysis */}
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded transition-all duration-200"
              style={{
                backgroundColor: selectedWord ? 'var(--ink-charcoal)' : 'transparent',
                color: selectedWord ? 'var(--cream)' : 'var(--ink-charcoal)',
                border: `1px solid ${selectedWord ? 'var(--gold-accent)' : 'rgba(43, 37, 32, 0.2)'}`,
                fontFamily: 'Georgia, Garamond, serif',
                fontSize: '0.85rem'
              }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              <span>Análisis Morfológico IA</span>
            </button>
          </div>
        </div>

        {/* Text Reference */}
        <div className="py-2 flex justify-center border-b" style={{ borderColor: 'rgba(43, 37, 32, 0.05)', backgroundColor: 'rgba(43, 37, 32, 0.02)' }}>
          <span style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '0.8rem',
            fontStyle: 'italic',
            opacity: 0.8,
            letterSpacing: '0.05em'
          }}>
            Liber I: vv. {pages[currentPage - 1].verseRange.replace('-', ' - ')}, Scrinium – Tu estuche digital
          </span>
        </div>
      </header>

      {/* Main Content - Two Columns */}
      <main className="flex-1 overflow-auto relative">
        {/* Left Navigation Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="navigation-arrow navigation-arrow-left"
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '1.5px solid rgba(47, 47, 47, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.3 : 0.6,
            transition: 'all 0.3s ease',
            zIndex: 40
          }}
        >
          <ChevronLeft 
            className="w-6 h-6" 
            strokeWidth={1.5}
            style={{ color: '#2F2F2F' }}
          />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="navigation-arrow navigation-arrow-right"
          style={{
            position: 'fixed',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            border: '1.5px solid rgba(47, 47, 47, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.3 : 0.6,
            transition: 'all 0.3s ease',
            zIndex: 40
          }}
        >
          <ChevronRight 
            className="w-6 h-6" 
            strokeWidth={1.5}
            style={{ color: '#2F2F2F' }}
          />
        </button>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Latin Column */}
            <div>
              <h2 className="mb-6 pb-3 border-b" style={{
                fontFamily: '"Old Standard TT", Baskerville, Georgia, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '1.3rem',
                fontWeight: '600',
                letterSpacing: '0.03em',
                borderColor: 'rgba(43, 37, 32, 0.2)'
              }}>
                Latín
              </h2>
              <div>
                {pages[currentPage - 1].lines.map((item) => (
                  <div 
                    key={item.line}
                    className="flex gap-4 mb-4 transition-all duration-200"
                    onMouseEnter={() => setHighlightedLine(item.line)}
                    onMouseLeave={() => setHighlightedLine(null)}
                    style={{
                      backgroundColor: highlightedLine === item.line ? 'rgba(212, 165, 116, 0.08)' : 'transparent',
                      padding: '0.5rem',
                      marginLeft: '-0.5rem',
                      marginRight: '-0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {/* Line Numbers */}
                    {item.line % 5 === 0 && (
                      <div 
                        className="flex-shrink-0 text-right"
                        style={{
                          width: '40px',
                          fontFamily: '"Old Standard TT", Georgia, serif',
                          color: 'var(--ink-charcoal)',
                          opacity: 0.4,
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {item.line}
                      </div>
                    )}
                    {item.line % 5 !== 0 && (
                      <div style={{ width: '40px' }}></div>
                    )}

                    {/* Latin Text */}
                    <p 
                      className="flex-1"
                      style={{
                        fontFamily: '"Old Standard TT", Baskerville, Georgia, serif',
                        color: 'var(--ink-charcoal)',
                        fontSize: `${fontSize}px`,
                        lineHeight: '2',
                        letterSpacing: '0.02em',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.tagName === 'SPAN') {
                          handleWordClick(target.textContent || '');
                        }
                      }}
                    >
                      {item.latin.split(' ').map((word, idx) => (
                        <span
                          key={idx}
                          className="hover:underline"
                          style={{
                            backgroundColor: selectedWord === word ? 'rgba(212, 165, 116, 0.3)' : 'transparent',
                            padding: '2px 4px',
                            borderRadius: '2px',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </p>

                    {/* Alignment Indicator */}
                    {highlightedLine === item.line && (
                      <div 
                        style={{
                          position: 'absolute',
                          right: '-1rem',
                          width: '2rem',
                          height: '1px',
                          backgroundColor: 'var(--gold-accent)',
                          opacity: 0.5,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div 
              style={{
                position: 'absolute',
                left: '50%',
                top: '200px',
                bottom: '100px',
                width: '1px',
                backgroundColor: 'rgba(43, 37, 32, 0.15)',
                transform: 'translateX(-50%)'
              }}
            />

            {/* Spanish Column */}
            <div>
              <h2 className="mb-6 pb-3 border-b" style={{
                fontFamily: '"Old Standard TT", Baskerville, Georgia, serif',
                color: 'var(--ink-charcoal)',
                fontSize: '1.3rem',
                fontWeight: '600',
                letterSpacing: '0.03em',
                borderColor: 'rgba(43, 37, 32, 0.2)'
              }}>
                Español
              </h2>
              <div>
                {pages[currentPage - 1].lines.map((item) => (
                  <div 
                    key={item.line}
                    className="flex gap-4 mb-4 transition-all duration-200"
                    onMouseEnter={() => setHighlightedLine(item.line)}
                    onMouseLeave={() => setHighlightedLine(null)}
                    style={{
                      backgroundColor: highlightedLine === item.line ? 'rgba(212, 165, 116, 0.08)' : 'transparent',
                      padding: '0.5rem',
                      marginLeft: '-0.5rem',
                      marginRight: '-0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    <div style={{ width: '40px' }}></div>

                    {/* Spanish Text */}
                    <p 
                      className="flex-1"
                      style={{
                        fontFamily: '"Old Standard TT", Baskerville, Georgia, serif',
                        color: 'var(--ink-charcoal)',
                        fontSize: `${fontSize}px`,
                        lineHeight: '2',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.spanish}
                    </p>

                    {/* Alignment Indicator */}
                    {highlightedLine === item.line && (
                      <div 
                        style={{
                          position: 'absolute',
                          left: '-1rem',
                          width: '2rem',
                          height: '1px',
                          backgroundColor: 'var(--gold-accent)',
                          opacity: 0.5,
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="py-4 text-center border-t relative"
        style={{
          backgroundColor: 'var(--parchment)',
          borderColor: 'rgba(43, 37, 32, 0.1)'
        }}
      >
        {/* Progress Indicator */}
        <div className="mb-2">
          <p style={{
            fontFamily: 'Georgia, Garamond, serif',
            fontStyle: 'italic',
            color: 'var(--ink-charcoal)',
            fontSize: '0.85rem',
            opacity: 0.6,
            letterSpacing: '0.03em'
          }}>
            Liber I: vv. {(currentPage - 1) * 20 + 1} - {Math.min(currentPage * 20, 80)}
          </p>
        </div>
        <p style={{
          fontFamily: 'Georgia, Garamond, serif',
          color: 'var(--ink-charcoal)',
          fontSize: '0.75rem',
          opacity: 0.4,
          letterSpacing: '0.05em'
        }}>
          Scrinium – Tu estuche digital
        </p>
      </footer>

      {/* Word Analysis Tooltip */}
      {selectedWord && (
        <div 
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 p-6 rounded-lg shadow-2xl z-50"
          style={{
            backgroundColor: 'var(--parchment)',
            border: '2px solid var(--gold-accent)',
            maxWidth: '400px'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--gold-accent)' }} />
            <h3 style={{
              fontFamily: 'Georgia, Garamond, serif',
              color: 'var(--ink-charcoal)',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Análisis Morfológico IA
            </h3>
          </div>
          <p className="mb-2" style={{
            fontFamily: '"Old Standard TT", Georgia, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            {selectedWord}
          </p>
          <div style={{
            fontFamily: 'Georgia, Garamond, serif',
            color: 'var(--ink-charcoal)',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            opacity: 0.8
          }}>
            <p><strong>Caso:</strong> Acusativo</p>
            <p><strong>Género:</strong> Femenino</p>
            <p><strong>Número:</strong> Plural</p>
            <p><strong>Función:</strong> Objeto directo</p>
          </div>
          <button
            onClick={() => setSelectedWord(null)}
            className="mt-4 w-full py-2 rounded transition-all duration-200"
            style={{
              backgroundColor: 'var(--ink-charcoal)',
              color: 'var(--cream)',
              border: '1px solid var(--gold-accent)',
              fontFamily: 'Georgia, Garamond, serif',
              fontSize: '0.85rem'
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Styles for navigation arrows */}
      <style>{`
        .navigation-arrow:not(:disabled):hover {
          opacity: 1 !important;
          border-color: rgba(47, 47, 47, 0.3) !important;
          background-color: rgba(47, 47, 47, 0.03) !important;
        }

        .navigation-arrow:not(:disabled):active {
          transform: translateY(-50%) scale(0.95);
        }
      `}</style>
    </div>
  );
}