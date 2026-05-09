export function seedPlacements(slugToId: Record<string, string>) {
  const c = (slug: string) => slugToId[slug];
  return [
    // IIT Bombay
    { collegeId: c('iit-bombay'), year: 2024, avgPackage: 25.4, highestPackage: 3.67, placementRate: 95, medianPackage: 22.0, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Amazon', 'DE Shaw'] },
    { collegeId: c('iit-bombay'), year: 2023, avgPackage: 22.8, highestPackage: 2.50, placementRate: 94, medianPackage: 20.5, topRecruiters: ['Google', 'Microsoft', 'Tower Research', 'Amazon', 'Qualcomm'] },
    { collegeId: c('iit-bombay'), year: 2022, avgPackage: 20.1, highestPackage: 1.80, placementRate: 93, medianPackage: 18.0, topRecruiters: ['Google', 'Uber', 'Sprinklr', 'Amazon', 'Alphagrep'] },

    // IIT Delhi
    { collegeId: c('iit-delhi'), year: 2024, avgPackage: 27.1, highestPackage: 4.00, placementRate: 96, medianPackage: 24.0, topRecruiters: ['Google', 'Microsoft', 'McKinsey', 'Graviton', 'Samsung'] },
    { collegeId: c('iit-delhi'), year: 2023, avgPackage: 24.2, highestPackage: 3.00, placementRate: 95, medianPackage: 21.5, topRecruiters: ['Google', 'Amazon', 'Texas Instruments', 'Boeing', 'Goldman Sachs'] },
    { collegeId: c('iit-delhi'), year: 2022, avgPackage: 21.5, highestPackage: 2.10, placementRate: 94, medianPackage: 19.0, topRecruiters: ['Google', 'Microsoft', 'Adobe', 'Zomato', 'Tata Steel'] },

    // IIT Madras
    { collegeId: c('iit-madras'), year: 2024, avgPackage: 24.0, highestPackage: 3.20, placementRate: 92, medianPackage: 21.0, topRecruiters: ['Google', 'Rubrik', 'Amazon', 'Nvidia', 'Qualcomm'] },
    { collegeId: c('iit-madras'), year: 2023, avgPackage: 21.5, highestPackage: 2.50, placementRate: 91, medianPackage: 19.5, topRecruiters: ['Apple', 'Google', 'Texas Instruments', 'Samsung R&D', 'Micron'] },

    // IIT Kanpur
    { collegeId: c('iit-kanpur'), year: 2024, avgPackage: 23.5, highestPackage: 3.10, placementRate: 91, medianPackage: 20.5, topRecruiters: ['Microsoft', 'Google', 'Goldman Sachs', 'Apple', 'Amazon'] },
    { collegeId: c('iit-kanpur'), year: 2023, avgPackage: 21.2, highestPackage: 2.70, placementRate: 90, medianPackage: 19.0, topRecruiters: ['Google', 'DE Shaw', 'Amazon', 'Cisco', 'Rubrik'] },

    // IIT Kharagpur
    { collegeId: c('iit-kharagpur'), year: 2024, avgPackage: 20.5, highestPackage: 2.80, placementRate: 88, medianPackage: 18.0, topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Capgemini', 'L&T'] },
    { collegeId: c('iit-kharagpur'), year: 2023, avgPackage: 18.2, highestPackage: 2.20, placementRate: 86, medianPackage: 16.0, topRecruiters: ['Amazon', 'Microsoft', 'Tata Motors', 'ITC', 'Goldman Sachs'] },

    // BITS Pilani
    { collegeId: c('bits-pilani'), year: 2024, avgPackage: 18.5, highestPackage: 2.00, placementRate: 92, medianPackage: 16.0, topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Sprinklr'] },
    { collegeId: c('bits-pilani'), year: 2023, avgPackage: 16.8, highestPackage: 1.80, placementRate: 91, medianPackage: 14.5, topRecruiters: ['Oracle', 'SAP', 'Amazon', 'Cisco', 'Walmart Labs'] },

    // NIT Trichy
    { collegeId: c('nit-trichy'), year: 2024, avgPackage: 14.2, highestPackage: 1.20, placementRate: 90, medianPackage: 12.0, topRecruiters: ['TCS', 'Infosys', 'Amazon', 'Wipro', 'Samsung'] },
    { collegeId: c('nit-trichy'), year: 2023, avgPackage: 12.5, highestPackage: 1.00, placementRate: 88, medianPackage: 11.0, topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'L&T', 'Hyundai'] },

    // NIT Warangal
    { collegeId: c('nit-warangal'), year: 2024, avgPackage: 13.8, highestPackage: 1.10, placementRate: 89, medianPackage: 11.5, topRecruiters: ['TCS', 'Amazon', 'Infosys', 'Samsung', 'Oracle'] },
    { collegeId: c('nit-warangal'), year: 2023, avgPackage: 12.1, highestPackage: 0.95, placementRate: 87, medianPackage: 10.5, topRecruiters: ['TCS', 'Wipro', 'Cognizant', 'Qualcomm', 'BHEL'] },

    // VIT Vellore
    { collegeId: c('vit-vellore'), year: 2024, avgPackage: 9.2, highestPackage: 0.80, placementRate: 82, medianPackage: 7.5, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Zoho'] },
    { collegeId: c('vit-vellore'), year: 2023, avgPackage: 8.1, highestPackage: 0.65, placementRate: 80, medianPackage: 6.8, topRecruiters: ['TCS', 'HCL', 'Capgemini', 'Tech Mahindra', 'Amazon'] },

    // DTU
    { collegeId: c('dtu-delhi'), year: 2024, avgPackage: 12.5, highestPackage: 0.95, placementRate: 85, medianPackage: 10.5, topRecruiters: ['Google', 'Amazon', 'Microsoft', 'Paytm', 'InMobi'] },
    { collegeId: c('dtu-delhi'), year: 2023, avgPackage: 11.0, highestPackage: 0.80, placementRate: 83, medianPackage: 9.5, topRecruiters: ['Amazon', 'Flipkart', 'Samsung', 'Nvidia', 'DE Shaw'] },

    // MIT Manipal
    { collegeId: c('mit-manipal'), year: 2024, avgPackage: 8.5, highestPackage: 0.72, placementRate: 78, medianPackage: 7.0, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini'] },
    { collegeId: c('mit-manipal'), year: 2023, avgPackage: 7.8, highestPackage: 0.60, placementRate: 76, medianPackage: 6.5, topRecruiters: ['TCS', 'HCL', 'IBM', 'Mindtree', 'L&T Infotech'] },

    // IIT Roorkee
    { collegeId: c('iit-roorkee'), year: 2024, avgPackage: 21.0, highestPackage: 2.50, placementRate: 90, medianPackage: 18.5, topRecruiters: ['Microsoft', 'Amazon', 'Ola', 'Samsung', 'Goldman Sachs'] },
    { collegeId: c('iit-roorkee'), year: 2023, avgPackage: 18.5, highestPackage: 2.00, placementRate: 89, medianPackage: 16.5, topRecruiters: ['Google', 'Amazon', 'Visa', 'Cisco', 'Cohesity'] },

    // NIT Surathkal
    { collegeId: c('nit-surathkal'), year: 2024, avgPackage: 13.5, highestPackage: 1.05, placementRate: 88, medianPackage: 11.0, topRecruiters: ['Amazon', 'Infosys', 'Oracle', 'Wipro', 'Qualcomm'] },
    { collegeId: c('nit-surathkal'), year: 2023, avgPackage: 12.0, highestPackage: 0.90, placementRate: 86, medianPackage: 10.0, topRecruiters: ['TCS', 'Infosys', 'Cisco', 'SAP', 'Capgemini'] },

    // PSG Coimbatore
    { collegeId: c('psg-coimbatore'), year: 2024, avgPackage: 7.5, highestPackage: 0.55, placementRate: 80, medianPackage: 6.2, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'CTS', 'Ford'] },
    { collegeId: c('psg-coimbatore'), year: 2023, avgPackage: 6.8, highestPackage: 0.48, placementRate: 78, medianPackage: 5.8, topRecruiters: ['TCS', 'L&T', 'Pricol', 'Carborundum', 'KGISL'] },

    // SRM
    { collegeId: c('srm-kattankulathur'), year: 2024, avgPackage: 7.2, highestPackage: 0.60, placementRate: 75, medianPackage: 5.8, topRecruiters: ['TCS', 'Infosys', 'Amazon', 'Wipro', 'CTS'] },
    { collegeId: c('srm-kattankulathur'), year: 2023, avgPackage: 6.5, highestPackage: 0.52, placementRate: 73, medianPackage: 5.2, topRecruiters: ['TCS', 'HCL', 'Accenture', 'Ford', 'Zoho'] },

    // Jadavpur
    { collegeId: c('jadavpur-university'), year: 2024, avgPackage: 11.5, highestPackage: 0.90, placementRate: 82, medianPackage: 9.5, topRecruiters: ['TCS', 'Amazon', 'Wipro', 'Cognizant', 'HealthKart'] },
    { collegeId: c('jadavpur-university'), year: 2023, avgPackage: 10.2, highestPackage: 0.75, placementRate: 80, medianPackage: 8.5, topRecruiters: ['TCS', 'Infosys', 'Capgemini', 'PwC', 'SAIL'] },

    // Thapar
    { collegeId: c('thapar-patiala'), year: 2024, avgPackage: 11.2, highestPackage: 0.85, placementRate: 83, medianPackage: 9.0, topRecruiters: ['Amazon', 'Microsoft', 'Sprinklr', 'Samsung', 'Infosys'] },
    { collegeId: c('thapar-patiala'), year: 2023, avgPackage: 9.8, highestPackage: 0.72, placementRate: 81, medianPackage: 8.2, topRecruiters: ['TCS', 'Amazon', 'Adobe', 'Paytm', 'Nucleus Software'] },

    // Amity
    { collegeId: c('amity-noida'), year: 2024, avgPackage: 6.5, highestPackage: 0.45, placementRate: 72, medianPackage: 5.2, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL'] },
    { collegeId: c('amity-noida'), year: 2023, avgPackage: 5.8, highestPackage: 0.38, placementRate: 70, medianPackage: 4.8, topRecruiters: ['TCS', 'HCL', 'Capgemini', 'KPMG', 'EY'] },

    // IIM Ahmedabad
    { collegeId: c('iim-ahmedabad'), year: 2024, avgPackage: 35.1, highestPackage: 1.15, placementRate: 100, medianPackage: 32.5, topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'Google'] },
    { collegeId: c('iim-ahmedabad'), year: 2023, avgPackage: 32.5, highestPackage: 1.00, placementRate: 100, medianPackage: 30.0, topRecruiters: ['McKinsey', 'Accenture Strategy', 'Amazon', 'Flipkart', 'Hindustan Unilever'] },

    // IIM Bangalore
    { collegeId: c('iim-bangalore'), year: 2024, avgPackage: 33.8, highestPackage: 1.08, placementRate: 100, medianPackage: 31.0, topRecruiters: ['McKinsey', 'BCG', 'Amazon', 'Microsoft', 'Bain'] },
    { collegeId: c('iim-bangalore'), year: 2023, avgPackage: 31.0, highestPackage: 0.98, placementRate: 100, medianPackage: 28.5, topRecruiters: ['Goldman Sachs', 'Bain', 'Cisco', 'Hindustan Unilever', 'Samsung'] },

    // NLSIU
    { collegeId: c('nlsiu-bangalore'), year: 2024, avgPackage: 22.0, highestPackage: 0.80, placementRate: 88, medianPackage: 18.0, topRecruiters: ['Cyril Amarchand Mangaldas', 'AZB & Partners', 'Trilegal', 'Shardul Amarchand', 'JSA'] },
    { collegeId: c('nlsiu-bangalore'), year: 2023, avgPackage: 19.5, highestPackage: 0.70, placementRate: 87, medianPackage: 16.5, topRecruiters: ['AZB & Partners', 'Khaitan & Co', 'Luthra & Luthra', 'S&R Associates', 'Economic Laws Practice'] },

    // IIT Hyderabad
    { collegeId: c('iit-hyderabad'), year: 2024, avgPackage: 19.8, highestPackage: 2.20, placementRate: 89, medianPackage: 17.0, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'NVIDIA', 'Qualcomm'] },
    { collegeId: c('iit-hyderabad'), year: 2023, avgPackage: 17.5, highestPackage: 1.80, placementRate: 87, medianPackage: 15.5, topRecruiters: ['Amazon', 'Samsung', 'Intel', 'Cadence', 'Oracle'] },

    // BIT Mesra
    { collegeId: c('bit-mesra'), year: 2024, avgPackage: 7.8, highestPackage: 0.58, placementRate: 74, medianPackage: 6.5, topRecruiters: ['TCS', 'Wipro', 'Infosys', 'CTS', 'Tech Mahindra'] },
    { collegeId: c('bit-mesra'), year: 2023, avgPackage: 7.0, highestPackage: 0.50, placementRate: 72, medianPackage: 5.8, topRecruiters: ['TCS', 'HCL', 'Accenture', 'IBM', 'BPCL'] },

    // Anna University
    { collegeId: c('anna-university-chennai'), year: 2024, avgPackage: 8.5, highestPackage: 0.65, placementRate: 78, medianPackage: 6.8, topRecruiters: ['TCS', 'Infosys', 'CTS', 'Zoho', 'Freshworks'] },
    { collegeId: c('anna-university-chennai'), year: 2023, avgPackage: 7.5, highestPackage: 0.55, placementRate: 76, medianPackage: 6.0, topRecruiters: ['TCS', 'HCL', 'Wipro', 'Ford', 'L&T'] },

    // CIT Coimbatore
    { collegeId: c('cit-coimbatore'), year: 2024, avgPackage: 6.2, highestPackage: 0.42, placementRate: 72, medianPackage: 5.0, topRecruiters: ['TCS', 'Infosys', 'Wipro', 'CTS', 'LTI'] },
    { collegeId: c('cit-coimbatore'), year: 2023, avgPackage: 5.5, highestPackage: 0.38, placementRate: 70, medianPackage: 4.5, topRecruiters: ['TCS', 'HCL', 'Capgemini', 'Ramco', 'Elgi Equipments'] },
  ].filter(p => p.collegeId !== undefined);
}
