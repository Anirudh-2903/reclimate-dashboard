interface ReportData {
    producedBiochar: {
        approved: number;
        rejected: number;
        pending: number;
        mixed: number;
        shipped: number;
        applied: number;
        total: number;
    };
    biomassCollected: { label: string; value: number }[];
    biocharStats: {
        totalPacked: number;
        totalShipped: number;
    };
}

export async function generateReportContent(
    data: ReportData,
    reportName: string,
    date: Date,
): Promise<string> {
    try {
        const formattedData = formatReportData(data);
        const response = await fetch("/api/report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: formattedData, reportName, date }),
        });

        if (!response.ok) {
            throw new Error('Report content generation failed');
        }

        const { content } = await response.json();
        return content;
    } catch (error) {
        console.error("Error generating report content:", error);
        throw error;
    }
}

function formatReportData(data: ReportData): string {
    return `
    Biochar Production Data:
    - Total Produced: ${data.producedBiochar.total} liters
    - Approved: ${data.producedBiochar.approved} liters
    - Rejected: ${data.producedBiochar.rejected} liters
    - Pending: ${data.producedBiochar.pending} liters
    - Mixed: ${data.producedBiochar.mixed} kg
    - Shipped: ${data.producedBiochar.shipped} kg
    - Applied: ${data.producedBiochar.applied} kg

    Biomass Collected:
    ${data.biomassCollected.map(item => `- ${item.label}: ${item.value} kg`).join('\n')}

    Biochar Statistics:
    - Total Packed: ${data.biocharStats.totalPacked} kg
    - Total Shipped: ${data.biocharStats.totalShipped} kg
  `;
}