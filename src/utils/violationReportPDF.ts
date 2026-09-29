import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { INCIDENT_DETAILS, SUSPECT_VESSELS } from '../data/incidentData';
import sagarLogo from '../assets/sagar-logo.png';

export const generateViolationReport = async () => {
  const doc = new jsPDF();
  
  try {
    const imgElement = new Image();
    imgElement.src = sagarLogo;
    await new Promise((resolve) => {
      imgElement.onload = resolve;
      imgElement.onerror = resolve; // Continue even if image fails
    });
    if (imgElement.complete && imgElement.naturalHeight !== 0) {
      doc.addImage(imgElement, 'PNG', 14, 10, 20, 20);
    }
  } catch (e) {
    console.error("Failed to load logo", e);
  }

  // Header
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF INDIA // CONFIDENTIAL INVESTIGATION', 38, 15);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('INDIAN COAST GUARD HEADQUARTERS, NEW DELHI', 38, 20);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Document Reference: NTRO/ICG/MEZ/2026/014-CONFIDENTIAL', 38, 25);
  
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 32, 196, 32);

  // Section 1: Executive Incident Summary
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Executive Incident Summary', 15, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Incident ID: ${INCIDENT_DETAILS.incidentId}`, 15, 48);
  doc.text(`Location: ${INCIDENT_DETAILS.locationName}`, 15, 54);
  doc.text(`Sensor: Sentinel-1 SAR (Detection Time: ${INCIDENT_DETAILS.detectionTime})`, 15, 60);

  // Section 2: Slick Geometry & Environmental Hindcast
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Slick Geometry & Environmental Hindcast', 15, 72);
  
  autoTable(doc, {
    startY: 76,
    head: [['Parameter', 'Value']],
    body: [
      ['Area', `${INCIDENT_DETAILS.areaKm2} sq km`],
      ['Ocean Current', INCIDENT_DETAILS.oceanCurrent],
      ['Wind', INCIDENT_DETAILS.surfaceWind],
      ['Source Window', INCIDENT_DETAILS.mostProbableSourceWindow]
    ],
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] }
  });

  // Section 3: Forensic Suspect Ranking Table
  const finalY = (doc as any).lastAutoTable.finalY || 118;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Forensic Suspect Ranking', 15, finalY + 12);
  
  autoTable(doc, {
    startY: finalY + 16,
    head: [['Rank', 'Vessel Name', 'IMO', 'Flag', 'Match %', 'Dist (km)']],
    body: SUSPECT_VESSELS.map(v => [
      v.rank, v.name, v.imo, v.flag, `${v.score}%`, v.distanceKm
    ]),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] }
  });

  const finalY2 = (doc as any).lastAutoTable.finalY || 168;
  
  // Section 4: Legal Interdiction Mandate
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Legal Interdiction Mandate', 15, finalY2 + 12);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const legalText = `Under the Maritime Zones of India Act 1976 and MARPOL Annex I, evidence indicates deliberate discharge. Immediate interdiction and physical sampling of onboard logbooks/bilge tanks authorized for ${SUSPECT_VESSELS[0].name}.`;
  doc.text(legalText, 15, finalY2 + 20, { maxWidth: 180 });

  // Signature
  doc.setFont('helvetica', 'bold');
  doc.text('Director General of Maritime Intelligence, NTRO', 115, finalY2 + 60);
  
  doc.save(`NTRO_ICG_Dossier_${INCIDENT_DETAILS.incidentId}.pdf`);
};
