/**
 * This project is for non-commercial use only.
 * Commercial use is strictly prohibited.
 */
import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [industries, setIndustries] = useState([])
  const [insurances, setInsurances] = useState([])
  const [industryId, setIndustryId] = useState('')
  const [insuranceId, setInsuranceId] = useState('')
  const [results, setResults] = useState({ high: [], mid: [], low: [] })
  const [activeTab, setActiveTab] = useState('high')
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/api/industries')
      .then((res) => res.json())
      .then((data) => setIndustries(data))
      .catch((err) => console.error('Failed to load industries:', err))

    fetch('http://localhost:8080/api/insurances')
      .then((res) => res.json())
      .then((data) => setInsurances(data))
      .catch((err) => console.error('Failed to load insurances:', err))
  }, [])

  const selectedIndustry = useMemo(
    () => industries.find((item) => String(item.id) === String(industryId)),
    [industries, industryId]
  )

  const selectedInsurance = useMemo(
    () => insurances.find((item) => String(item.id) === String(insuranceId)),
    [insurances, insuranceId]
  )

  const currentResults = results[activeTab] || []

  const quickSearches = [
    { label: 'Restaurant + Public Liability', industry: 'Restaurant', insurance: 'Public Liability' },
    { label: 'Restaurant + Business Package', industry: 'Restaurant', insurance: 'Property / Business Package' },
    { label: 'Medical + Professional Indemnity', industry: 'Medical Centre / Medical Practice', insurance: 'Professional Indemnity' },
    { label: 'Medical + Liability', industry: 'Medical Centre / Medical Practice', insurance: 'Liability' },
  ]

  const quickFill = (industryName, insuranceName) => {
    const matchedIndustry = industries.find(
      (item) => item.industryName === industryName
    )
    const matchedInsurance = insurances.find(
      (item) => item.insuranceName === insuranceName
    )

    if (matchedIndustry) setIndustryId(String(matchedIndustry.id))
    if (matchedInsurance) setInsuranceId(String(matchedInsurance.id))
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!industryId || !insuranceId) return

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(
        `http://localhost:8080/api/match?industryId=${industryId}&insuranceId=${insuranceId}`
      )
      const data = await response.json()

      setResults({
        high: data.high || [],
        mid: data.mid || [],
        low: data.low || [],
      })

      setActiveTab('high')
    } catch (error) {
      console.error('Failed to fetch matches:', error)
      setResults({ high: [], mid: [], low: [] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandArea}>
            <div style={styles.brand}>UW Match</div>
            <nav style={styles.nav}>
              <a href="#" style={styles.navLink}>Home</a>
              <a href="#" style={styles.navLink}>Industries</a>
              <a href="#" style={styles.navLink}>Insurance Lines</a>
              <a href="#" style={styles.navLink}>Underwriters</a>
              <a href="#" style={styles.navLink}>Appetite View</a>
            </nav>
          </div>

          <div style={styles.headerActions}>
            <button style={styles.ghostButton}>Save Search</button>
            <button style={styles.primaryHeaderButton}>Open Matcher</button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div style={styles.heroTop}>
            <div style={styles.heroLabel}>Broker decision support prototype</div>
            <h1 style={styles.heroTitle}>Find the right underwriter faster</h1>
            <p style={styles.heroSubtitle}>
              Search by industry and insurance line, compare appetite levels,
              and turn a static directory into a structured matching tool.
            </p>

            <form onSubmit={handleSearch} style={styles.searchPanel}>
              <select
                value={industryId}
                onChange={(e) => setIndustryId(e.target.value)}
                style={styles.searchSelect}
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.industryName}
                  </option>
                ))}
              </select>

              <select
                value={insuranceId}
                onChange={(e) => setInsuranceId(e.target.value)}
                style={styles.searchSelect}
              >
                <option value="">Select Insurance</option>
                {insurances.map((insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.insuranceName}
                  </option>
                ))}
              </select>

              <button type="submit" style={styles.searchButton}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            <div style={styles.quickSearchBar}>
              <span style={styles.quickSearchLabel}>Popular searches:</span>
              <div style={styles.quickSearchWrap}>
                {quickSearches.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    style={styles.quickSearchButton}
                    onClick={() => quickFill(item.industry, item.insurance)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.dashboardLayout}>
            <aside style={styles.leftSidebar}>
              <div style={{ ...styles.smallBanner, ...styles.smallBannerBlue }}>
                <div style={styles.smallBannerTitle}>High Appetite</div>
                <div style={styles.smallBannerValue}>{results.high.length}</div>
                <div style={styles.smallBannerText}>
                  Industry and insurance both aligned
                </div>
              </div>

              <div style={{ ...styles.smallBanner, ...styles.smallBannerGold }}>
                <div style={styles.smallBannerTitle}>Mid Appetite</div>
                <div style={styles.smallBannerValue}>{results.mid.length}</div>
                <div style={styles.smallBannerText}>
                  One dimension matched
                </div>
              </div>

              <div style={{ ...styles.smallBanner, ...styles.smallBannerCoral }}>
                <div style={styles.smallBannerTitle}>Low Appetite</div>
                <div style={styles.smallBannerValue}>{results.low.length}</div>
                <div style={styles.smallBannerText}>
                  Broad market candidates
                </div>
              </div>

              <aside style={styles.overviewPanel}>
                <div style={styles.overviewHeader}>
                  <h3 style={styles.overviewTitle}>Search Summary</h3>
                  <span style={styles.versionBadge}>V1</span>
                </div>

                <div style={styles.overviewCard}>
                  <div style={styles.overviewLabel}>Selected Industry</div>
                  <div style={styles.overviewValue}>
                    {selectedIndustry?.industryName || '-'}
                  </div>
                </div>

                <div style={styles.overviewCard}>
                  <div style={styles.overviewLabel}>Selected Insurance</div>
                  <div style={styles.overviewValue}>
                    {selectedInsurance?.insuranceName || '-'}
                  </div>
                </div>

                <div style={styles.overviewCard}>
                  <div style={styles.overviewLabel}>Matching Logic</div>
                  <div style={styles.overviewText}>
                    High = both match<br />
                    Mid = one side match<br />
                    Low = other underwriters
                  </div>
                </div>
              </aside>
            </aside>

            <section style={styles.resultsSection}>
              <div style={styles.resultsSectionHeader}>
                <div>
                  <div style={styles.sectionKicker}>Appetite groups</div>
                  <h2 style={styles.resultsTitle}>Matching Results</h2>
                </div>
              </div>

              <div style={styles.tabBar}>
                <button
                  type="button"
                  style={
                    activeTab === 'high'
                      ? { ...styles.tabButton, ...styles.tabButtonHighActive }
                      : styles.tabButton
                  }
                  onClick={() => setActiveTab('high')}
                >
                  High ({results.high.length})
                </button>

                <button
                  type="button"
                  style={
                    activeTab === 'mid'
                      ? { ...styles.tabButton, ...styles.tabButtonMidActive }
                      : styles.tabButton
                  }
                  onClick={() => setActiveTab('mid')}
                >
                  Mid ({results.mid.length})
                </button>

                <button
                  type="button"
                  style={
                    activeTab === 'low'
                      ? { ...styles.tabButton, ...styles.tabButtonLowActive }
                      : styles.tabButton
                  }
                  onClick={() => setActiveTab('low')}
                >
                  Low ({results.low.length})
                </button>
              </div>

              {!hasSearched ? (
                <div style={styles.emptyState}>
                  Start by selecting an industry and insurance type above, then click Search.
                </div>
              ) : loading ? (
                <div style={styles.emptyState}>Loading matches...</div>
              ) : currentResults.length === 0 ? (
                <div style={styles.emptyState}>
                  No underwriters found in the <strong>{activeTab}</strong> appetite group.
                </div>
              ) : (
                <div style={styles.cardGrid}>
                  {currentResults.map((item) => (
                    <div key={item.underwriterId} style={styles.resultCard}>
                      <div style={styles.resultCardTop}>
                        <div>
                          <h3 style={styles.resultName}>{item.underwriterName}</h3>
                          <div style={styles.resultMetaTags}>
                            {selectedIndustry?.industryName && (
                              <span style={styles.metaTag}>{selectedIndustry.industryName}</span>
                            )}
                            {selectedInsurance?.insuranceName && (
                              <span style={styles.metaTag}>{selectedInsurance.insuranceName}</span>
                            )}
                          </div>
                        </div>

                        <span
                          style={{
                            ...styles.appetiteBadge,
                            ...(item.appetite === 'High'
                              ? styles.appetiteHigh
                              : item.appetite === 'Mid'
                              ? styles.appetiteMid
                              : styles.appetiteLow),
                          }}
                        >
                          {item.appetite}
                        </span>
                      </div>

                      <p style={styles.matchReason}>
                        {item.appetite === 'High'
                          ? 'Exact match across both industry and insurance dimensions.'
                          : item.appetite === 'Mid'
                          ? 'Partial match based on one matching dimension.'
                          : 'Broad market relevance only. Requires further review.'}
                      </p>

                      <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                          <div style={styles.infoLabel}>Contact</div>
                          <div style={styles.infoValue}>{item.contactPerson || '-'}</div>
                        </div>

                        <div style={styles.infoItem}>
                          <div style={styles.infoLabel}>Phone</div>
                          <div style={styles.infoValue}>{item.phone || '-'}</div>
                        </div>

                        <div style={styles.infoItem}>
                          <div style={styles.infoLabel}>Email</div>
                          <div style={styles.infoValue}>{item.email || '-'}</div>
                        </div>

                        <div style={styles.infoItem}>
                          <div style={styles.infoLabel}>Website</div>
                          <div style={styles.infoValue}>
                            {item.web ? (
                              <a
                                href={`https://${item.web}`}
                                target="_blank"
                                rel="noreferrer"
                                style={styles.link}
                              >
                                {item.web}
                              </a>
                            ) : (
                              '-'
                            )}
                          </div>
                        </div>

                        <div style={{ ...styles.infoItem, ...styles.infoItemFull }}>
                          <div style={styles.infoLabel}>Address</div>
                          <div style={styles.infoValue}>{item.address || '-'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F4F8FB',
    color: '#16303B',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    background: 'linear-gradient(90deg, #123C4A 0%, #185B69 45%, #1A8194 100%)',
    boxShadow: '0 8px 20px rgba(18, 60, 74, 0.18)',
  },
  headerInner: {
    maxWidth: '1220px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  brandArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  brand: {
    fontSize: '34px',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    color: '#B6F1F8',
  },
  nav: {
    display: 'flex',
    gap: '18px',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#EAF7FB',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ghostButton: {
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'transparent',
    color: '#FFFFFF',
    padding: '10px 16px',
    borderRadius: '999px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  primaryHeaderButton: {
    border: 'none',
    background: '#B6F1F8',
    color: '#123C4A',
    padding: '10px 16px',
    borderRadius: '999px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1220px',
    margin: '0 auto',
    padding: '22px 20px 40px',
  },
  heroSection: {
    display: 'grid',
    gap: '18px',
  },
  heroTop: {
    borderRadius: '28px',
    background:
      'linear-gradient(135deg, rgba(24,183,201,0.16) 0%, rgba(255,255,255,1) 40%, rgba(244,201,93,0.12) 100%)',
    border: '1px solid rgba(24,183,201,0.18)',
    padding: '30px 30px 26px',
    boxShadow: '0 18px 42px rgba(18, 60, 74, 0.08)',
  },
  heroLabel: {
    display: 'inline-flex',
    alignSelf: 'flex-start',
    background: '#DDF6FA',
    color: '#13879A',
    padding: '7px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  heroTitle: {
    marginTop: '16px',
    marginBottom: 0,
    fontSize: '46px',
    lineHeight: 1.08,
    fontWeight: 900,
    color: '#123C4A',
    letterSpacing: '-0.04em',
  },
  heroSubtitle: {
    marginTop: '16px',
    marginBottom: 0,
    maxWidth: '760px',
    color: '#55717C',
    fontSize: '17px',
    lineHeight: 1.8,
  },
  searchPanel: {
    display: 'grid',
    gridTemplateColumns: '1.15fr 1.35fr 210px',
    gap: '18px',
    alignItems: 'center',
    marginTop: '22px',
    padding: '18px',
    borderRadius: '24px',
    background: '#FFFFFF',
    boxShadow: '0 14px 32px rgba(18,60,74,0.10)',
    border: '2px solid #BFE9EF',
  },
  searchSelect: {
    width: '100%',
    padding: '18px 18px',
    borderRadius: '18px',
    border: '1.5px solid #BFE3E9',
    background: '#FDFEFE',
    color: '#123C4A',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 4px 12px rgba(18,60,74,0.04)',
  },
  searchButton: {
    border: 'none',
    background: 'linear-gradient(90deg, #18B7C9 0%, #1597A8 100%)',
    color: '#FFFFFF',
    padding: '18px 24px',
    borderRadius: '18px',
    fontWeight: 800,
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 12px 24px rgba(24,183,201,0.28)',
    height: '100%',
  },
  quickSearchBar: {
    display: 'grid',
    gap: '10px',
    marginTop: '18px',
  },
  quickSearchLabel: {
    color: '#6B7D86',
    fontSize: '14px',
    fontWeight: 600,
  },
  quickSearchWrap: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  quickSearchButton: {
    border: '1px solid #D4EEF2',
    background: '#FFFFFF',
    color: '#14869A',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  dashboardLayout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '18px',
    alignItems: 'start',
  },
  leftSidebar: {
    display: 'grid',
    gap: '14px',
  },
  smallBanner: {
    borderRadius: '24px',
    padding: '20px',
    color: '#123C4A',
    boxShadow: '0 12px 28px rgba(18, 60, 74, 0.06)',
    minHeight: '135px',
  },
  smallBannerBlue: {
    background: 'linear-gradient(135deg, #C9F2F7 0%, #E9FAFD 100%)',
  },
  smallBannerGold: {
    background: 'linear-gradient(135deg, #FFF2CC 0%, #FFF8E4 100%)',
  },
  smallBannerCoral: {
    background: 'linear-gradient(135deg, #FFE1D9 0%, #FFF0EB 100%)',
  },
  smallBannerTitle: {
    fontSize: '13px',
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#54717B',
  },
  smallBannerValue: {
    marginTop: '10px',
    fontSize: '38px',
    fontWeight: 900,
    color: '#123C4A',
  },
  smallBannerText: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#5F767E',
    lineHeight: 1.6,
  },
  overviewPanel: {
    borderRadius: '28px',
    background: '#FFFFFF',
    boxShadow: '0 16px 36px rgba(18, 60, 74, 0.08)',
    padding: '20px',
    display: 'grid',
    gap: '12px',
    alignContent: 'start',
  },
  overviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  overviewTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 900,
    color: '#123C4A',
  },
  versionBadge: {
    background: '#EAF7FB',
    color: '#13879A',
    borderRadius: '999px',
    padding: '6px 10px',
    fontWeight: 800,
    fontSize: '12px',
  },
  overviewCard: {
    borderRadius: '18px',
    background: '#F8FBFC',
    border: '1px solid #E2F1F4',
    padding: '14px',
  },
  overviewLabel: {
    color: '#6F838B',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  overviewValue: {
    marginTop: '8px',
    color: '#123C4A',
    fontWeight: 900,
    fontSize: '17px',
    lineHeight: 1.5,
  },
  overviewText: {
    marginTop: '8px',
    color: '#5F767E',
    fontSize: '14px',
    lineHeight: 1.8,
  },
  resultsSection: {
    display: 'grid',
    gap: '14px',
    minHeight: '100%',
  },
  resultsSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: '16px',
  },
  sectionKicker: {
    color: '#18A1B3',
    fontWeight: 800,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
  },
  resultsTitle: {
    marginTop: '8px',
    marginBottom: 0,
    fontSize: '40px',
    fontWeight: 900,
    color: '#123C4A',
    letterSpacing: '-0.04em',
  },
  tabBar: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
  },
  tabButton: {
    border: '1px solid #D7E8EC',
    background: '#FFFFFF',
    color: '#5B6B73',
    padding: '11px 18px',
    borderRadius: '999px',
    fontWeight: 800,
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(18,60,74,0.04)',
  },
  tabButtonHighActive: {
    background: '#22C55E',
    color: '#FFFFFF',
    border: '1px solid #22C55E',
  },
  tabButtonMidActive: {
    background: '#F59E0B',
    color: '#FFFFFF',
    border: '1px solid #F59E0B',
  },
  tabButtonLowActive: {
    background: '#EF4444',
    color: '#FFFFFF',
    border: '1px solid #EF4444',
  },
  emptyState: {
    borderRadius: '22px',
    background: '#FFFFFF',
    border: '1px dashed #CFE5EA',
    padding: '24px',
    color: '#607983',
    boxShadow: '0 10px 26px rgba(18,60,74,0.04)',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
  },
  resultCard: {
    borderRadius: '24px',
    background: '#FFFFFF',
    boxShadow: '0 16px 36px rgba(18, 60, 74, 0.07)',
    padding: '22px',
    border: '1px solid #E6F1F4',
  },
  resultCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: '14px',
  },
  resultName: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#123C4A',
    fontSize: '24px',
    fontWeight: 900,
    lineHeight: 1.2,
  },
  resultMetaTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  metaTag: {
    background: '#EAF7FB',
    color: '#188AA0',
    borderRadius: '999px',
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: 800,
  },
  appetiteBadge: {
    borderRadius: '999px',
    padding: '7px 12px',
    fontSize: '12px',
    fontWeight: 900,
    whiteSpace: 'nowrap',
  },
  appetiteHigh: {
    background: '#DCFCE7',
    color: '#166534',
  },
  appetiteMid: {
    background: '#FEF3C7',
    color: '#92400E',
  },
  appetiteLow: {
    background: '#FEE2E2',
    color: '#991B1B',
  },
  matchReason: {
    marginTop: '16px',
    marginBottom: '18px',
    color: '#5D747C',
    lineHeight: 1.8,
    fontSize: '14px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  infoItem: {
    borderRadius: '16px',
    background: '#F8FBFC',
    padding: '14px',
    border: '1px solid #E8F2F5',
  },
  infoItemFull: {
    gridColumn: '1 / -1',
  },
  infoLabel: {
    color: '#70848B',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '7px',
  },
  infoValue: {
    color: '#123C4A',
    fontSize: '14px',
    lineHeight: 1.7,
    wordBreak: 'break-word',
  },
  link: {
    color: '#18A1B3',
    textDecoration: 'none',
    fontWeight: 700,
  },
}