
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadItinerary(
  bookingReference: string
) {
  console.log(
    "Downloading itinerary for booking reference:",
    bookingReference
  );

  const element = document.getElementById(
    "customer-itinerary-pdf"
  );

  if (!element) {
    console.error("PDF element not found");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Convert canvas to JPEG.
    const imageData = canvas.toDataURL(
      "image/jpeg",
      0.95
    );

    console.log(
      "Canvas:",
      canvas.width,
      "x",
      canvas.height
    );

    console.log(
      "Image:",
      imageData.substring(0, 30)
    );

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imageWidth = pageWidth;

    const imageHeight =
      (canvas.height / canvas.width) *
      imageWidth;

    console.log({
      imageWidth,
      imageHeight,
    });

    let heightLeft = imageHeight;
    let position = 0;

    /*
     * Add first page.
     */
    pdf.addImage(
      imageData,
      "JPEG",
      0,
      position,
      imageWidth,
      imageHeight
    );

    heightLeft -= pageHeight;

    /*
     * Add remaining pages.
     */
    while (heightLeft > 0) {
      position = heightLeft - imageHeight;

      pdf.addPage();

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        position,
        imageWidth,
        imageHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save(
      `Itinerary-${bookingReference}.pdf`
    );
  } catch (error) {
    console.error(
      "Failed to generate itinerary PDF:",
      error
    );
  }
}
