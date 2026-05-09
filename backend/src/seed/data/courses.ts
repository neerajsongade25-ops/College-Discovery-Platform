import { CourseLevel } from '@prisma/client';

export function seedCourses(slugToId: Record<string, string>) {
  const c = (slug: string) => slugToId[slug];

  return [
    // IIT Bombay
    { collegeId: c('iit-bombay'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 110, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-bombay'), name: 'B.Tech Electrical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 80, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-bombay'), name: 'M.Tech Data Science', level: CourseLevel.PG, duration: '2 years', feesPerYear: 50000, totalFees: 100000, seats: 30, examAccepted: ['GATE'], eligibility: 'B.Tech/B.E' },

    // IIT Delhi
    { collegeId: c('iit-delhi'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 100, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-delhi'), name: 'B.Tech Mechanical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 75, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-delhi'), name: 'MBA', level: CourseLevel.PG, duration: '2 years', feesPerYear: 200000, totalFees: 400000, seats: 50, examAccepted: ['CAT'], eligibility: 'Graduation' },

    // IIT Madras
    { collegeId: c('iit-madras'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 100, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-madras'), name: 'B.Tech Aerospace Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 50, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },

    // IIT Kanpur
    { collegeId: c('iit-kanpur'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 245000, totalFees: 980000, seats: 90, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-kanpur'), name: 'B.Tech Electrical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 245000, totalFees: 980000, seats: 80, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },

    // IIT Kharagpur
    { collegeId: c('iit-kharagpur'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 230000, totalFees: 920000, seats: 115, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-kharagpur'), name: 'B.Tech Civil Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 230000, totalFees: 920000, seats: 100, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },

    // BITS Pilani
    { collegeId: c('bits-pilani'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 530000, totalFees: 2120000, seats: 180, examAccepted: ['BITSAT'], eligibility: '10+2 with PCM, 75%+' },
    { collegeId: c('bits-pilani'), name: 'B.E. Electronics & Communication', level: CourseLevel.UG, duration: '4 years', feesPerYear: 530000, totalFees: 2120000, seats: 110, examAccepted: ['BITSAT'], eligibility: '10+2 with PCM, 75%+' },
    { collegeId: c('bits-pilani'), name: 'M.Sc. Mathematics', level: CourseLevel.PG, duration: '2 years', feesPerYear: 160000, totalFees: 320000, seats: 60, examAccepted: ['BITSAT'], eligibility: '10+2 with PCM' },

    // NIT Trichy
    { collegeId: c('nit-trichy'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 165000, totalFees: 660000, seats: 100, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },
    { collegeId: c('nit-trichy'), name: 'B.Tech Mechanical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 165000, totalFees: 660000, seats: 120, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },
    { collegeId: c('nit-trichy'), name: 'M.Tech VLSI Design', level: CourseLevel.PG, duration: '2 years', feesPerYear: 50000, totalFees: 100000, seats: 20, examAccepted: ['GATE'], eligibility: 'B.Tech/B.E' },

    // NIT Warangal
    { collegeId: c('nit-warangal'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 160000, totalFees: 640000, seats: 90, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },
    { collegeId: c('nit-warangal'), name: 'B.Tech Electronics & Communication', level: CourseLevel.UG, duration: '4 years', feesPerYear: 160000, totalFees: 640000, seats: 90, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },

    // VIT Vellore
    { collegeId: c('vit-vellore'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 275000, totalFees: 1100000, seats: 600, examAccepted: ['VITEEE'], eligibility: '10+2 with PCM, 60%+' },
    { collegeId: c('vit-vellore'), name: 'B.Tech Mechanical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 245000, totalFees: 980000, seats: 300, examAccepted: ['VITEEE'], eligibility: '10+2 with PCM' },
    { collegeId: c('vit-vellore'), name: 'MBA', level: CourseLevel.PG, duration: '2 years', feesPerYear: 200000, totalFees: 400000, seats: 120, examAccepted: ['CAT', 'MAT', 'XAT'], eligibility: 'Graduation 50%+' },

    // DTU Delhi
    { collegeId: c('dtu-delhi'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 125000, totalFees: 500000, seats: 120, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM, Delhi domicile preferred' },
    { collegeId: c('dtu-delhi'), name: 'B.Tech Software Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 125000, totalFees: 500000, seats: 90, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },

    // MIT Manipal
    { collegeId: c('mit-manipal'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 440000, totalFees: 1760000, seats: 240, examAccepted: ['MET', 'JEE Main'], eligibility: '10+2 with PCM, 50%+' },
    { collegeId: c('mit-manipal'), name: 'B.Tech Biomedical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 380000, totalFees: 1520000, seats: 60, examAccepted: ['MET'], eligibility: '10+2 with PCB/PCM' },

    // IIT Roorkee
    { collegeId: c('iit-roorkee'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 86, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-roorkee'), name: 'B.Tech Civil Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 200, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },

    // NIT Surathkal
    { collegeId: c('nit-surathkal'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 165000, totalFees: 660000, seats: 90, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },
    { collegeId: c('nit-surathkal'), name: 'B.Tech Information Technology', level: CourseLevel.UG, duration: '4 years', feesPerYear: 165000, totalFees: 660000, seats: 60, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },

    // PSG Coimbatore
    { collegeId: c('psg-coimbatore'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 95000, totalFees: 380000, seats: 120, examAccepted: ['TNEA'], eligibility: '10+2 with PCM' },
    { collegeId: c('psg-coimbatore'), name: 'B.E. Electronics & Communication', level: CourseLevel.UG, duration: '4 years', feesPerYear: 85000, totalFees: 340000, seats: 120, examAccepted: ['TNEA'], eligibility: '10+2 with PCM' },

    // SRM
    { collegeId: c('srm-kattankulathur'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 295000, totalFees: 1180000, seats: 600, examAccepted: ['SRMJEEE', 'JEE Main'], eligibility: '10+2 with PCM, 60%+' },
    { collegeId: c('srm-kattankulathur'), name: 'B.Tech Artificial Intelligence', level: CourseLevel.UG, duration: '4 years', feesPerYear: 310000, totalFees: 1240000, seats: 180, examAccepted: ['SRMJEEE'], eligibility: '10+2 with PCM' },

    // Jadavpur
    { collegeId: c('jadavpur-university'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 45000, totalFees: 180000, seats: 75, examAccepted: ['WBJEE'], eligibility: '10+2 with PCM' },
    { collegeId: c('jadavpur-university'), name: 'B.E. Electrical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 40000, totalFees: 160000, seats: 95, examAccepted: ['WBJEE'], eligibility: '10+2 with PCM' },

    // Thapar
    { collegeId: c('thapar-patiala'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 375000, totalFees: 1500000, seats: 300, examAccepted: ['JEE Main', 'Thapar Entrance'], eligibility: '10+2 with PCM, 60%+' },
    { collegeId: c('thapar-patiala'), name: 'B.E. Electronics & Communication', level: CourseLevel.UG, duration: '4 years', feesPerYear: 370000, totalFees: 1480000, seats: 180, examAccepted: ['JEE Main'], eligibility: '10+2 with PCM' },

    // Amity
    { collegeId: c('amity-noida'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 390000, totalFees: 1560000, seats: 540, examAccepted: ['Amity JEE', 'JEE Main'], eligibility: '10+2 with PCM, 55%+' },
    { collegeId: c('amity-noida'), name: 'BBA', level: CourseLevel.UG, duration: '3 years', feesPerYear: 200000, totalFees: 600000, seats: 300, examAccepted: ['Amity Entrance'], eligibility: '10+2 any stream' },

    // IIM Ahmedabad
    { collegeId: c('iim-ahmedabad'), name: 'PGP (MBA)', level: CourseLevel.PG, duration: '2 years', feesPerYear: 1200000, totalFees: 2400000, seats: 385, examAccepted: ['CAT'], eligibility: 'Graduation 50%+' },

    // IIM Bangalore
    { collegeId: c('iim-bangalore'), name: 'PGP (MBA)', level: CourseLevel.PG, duration: '2 years', feesPerYear: 1300000, totalFees: 2600000, seats: 405, examAccepted: ['CAT'], eligibility: 'Graduation 50%+' },
    { collegeId: c('iim-bangalore'), name: 'EPGP (1-Year MBA)', level: CourseLevel.PG, duration: '1 year', feesPerYear: 2900000, totalFees: 2900000, seats: 70, examAccepted: ['GMAT', 'CAT'], eligibility: '5+ years work experience' },

    // NLSIU Bangalore
    { collegeId: c('nlsiu-bangalore'), name: 'B.A. LL.B (Hons)', level: CourseLevel.UG, duration: '5 years', feesPerYear: 330000, totalFees: 1650000, seats: 80, examAccepted: ['CLAT'], eligibility: '10+2 any stream, 45%+' },
    { collegeId: c('nlsiu-bangalore'), name: 'LL.M', level: CourseLevel.PG, duration: '1 year', feesPerYear: 180000, totalFees: 180000, seats: 30, examAccepted: ['CLAT PG'], eligibility: 'LL.B 55%+' },

    // IIT Hyderabad
    { collegeId: c('iit-hyderabad'), name: 'B.Tech Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 75, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },
    { collegeId: c('iit-hyderabad'), name: 'B.Tech AI & Machine Learning', level: CourseLevel.UG, duration: '4 years', feesPerYear: 250000, totalFees: 1000000, seats: 40, examAccepted: ['JEE Advanced'], eligibility: '10+2 with PCM' },

    // BIT Mesra
    { collegeId: c('bit-mesra'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 272000, totalFees: 1088000, seats: 120, examAccepted: ['JEE Main', 'BIT Mesra Entrance'], eligibility: '10+2 with PCM' },
    { collegeId: c('bit-mesra'), name: 'M.E. Software Engineering', level: CourseLevel.PG, duration: '2 years', feesPerYear: 100000, totalFees: 200000, seats: 30, examAccepted: ['GATE'], eligibility: 'B.Tech/B.E' },

    // Anna University
    { collegeId: c('anna-university-chennai'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 75000, totalFees: 300000, seats: 90, examAccepted: ['TNEA'], eligibility: '10+2 with PCM' },
    { collegeId: c('anna-university-chennai'), name: 'M.E. Computer Science', level: CourseLevel.PG, duration: '2 years', feesPerYear: 30000, totalFees: 60000, seats: 40, examAccepted: ['TANCET', 'GATE'], eligibility: 'B.E/B.Tech' },

    // CIT Coimbatore
    { collegeId: c('cit-coimbatore'), name: 'B.E. Computer Science', level: CourseLevel.UG, duration: '4 years', feesPerYear: 88000, totalFees: 352000, seats: 120, examAccepted: ['TNEA'], eligibility: '10+2 with PCM' },
    { collegeId: c('cit-coimbatore'), name: 'B.E. Mechanical Engineering', level: CourseLevel.UG, duration: '4 years', feesPerYear: 82000, totalFees: 328000, seats: 120, examAccepted: ['TNEA'], eligibility: '10+2 with PCM' },
  ].filter(c => c.collegeId !== undefined);
}
