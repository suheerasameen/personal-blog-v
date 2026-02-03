import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = false;

export async function generateOGImage(title: string) {
  // Load Inter from Google Fonts
  const interFont = await fetch(
    "https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch Inter font");
    return res.text();
  }).then((css) => {
    const match = css.match(/src: url\(([^)]+)\)/);
    if (match && match[1]) return fetch(match[1]).then((res) => res.arrayBuffer());
    console.error("Failed to extract font URL from Inter CSS");
    return null;
  }).catch(e => {
    console.error("Error loading Inter font:", e);
    return null;
  });

  const sourceCodeFont = await fetch(
    "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap"
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch Source Code Pro font");
    return res.text();
  }).then((css) => {
    const match = css.match(/src: url\(([^)]+)\)/);
    if (match && match[1]) return fetch(match[1]).then((res) => res.arrayBuffer());
    console.error("Failed to extract font URL from Source Code Pro CSS");
    return null;
  }).catch(e => {
    console.error("Error loading Source Code Pro font:", e);
    return null;
  });

  return new ImageResponse(
    (
      <div
        tw="relative flex flex-col items-center justify-center w-full h-full"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, #1a0a2e 0%, #050505 70%)",
        }}
      >
        {/* Grid background */}
        <div
          tw="absolute inset-0"
          style={{
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div tw="flex flex-col items-center" style={{ gap: "32px", maxWidth: "950px", padding: "80px" }}>
          {/* Logo */}
          <img
            src="data:image/png;base64,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'
            alt="Logo"
          width={80}
          height={80}
          />

          {/* Title */}
          <div
            tw="text-white text-center"
            style={{
              fontFamily: "Inter",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          tw="absolute flex"
          style={{
            fontFamily: "SourceCodePro",
            bottom: "40px",
            fontSize: "14px",
            color: "#666",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Waqas Ishaque        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        ...(interFont ? [{
          name: "Inter",
          data: interFont,
          weight: 700 as const,
          style: "normal" as const,
        }] : []),
        ...(sourceCodeFont ? [{
          name: "SourceCodePro",
          data: sourceCodeFont,
          weight: 500 as const,
          style: "normal" as const,
        }] : []),
      ],
    }
  );
}
