import type { OutletLocation } from "@/types";

// Pune areas with no Pizza Mood outlet yet. `about` = widely known facts only; add local specifics (rent range, footfall) as the owner supplies them.
export type FranchiseArea = { slug: string; name: string; about: string; nameMr: string; aboutMr: string };

export const FRANCHISE_AREAS: FranchiseArea[] = [
  { slug: "hadapsar", name: "Hadapsar", about: "Hadapsar is a large, busy part of east Pune on the Pune-Solapur Road, next to Magarpatta City and Amanora Park Town, with dense housing and an industrial belt.", nameMr: "हडपसर", aboutMr: "हडपसर हा पूर्व पुण्यातील पुणे-सोलापूर रस्त्यावरचा मोठा, गजबजलेला भाग आहे. मगरपट्टा सिटी आणि अमनोरा पार्क टाउन जवळ असून येथे दाट वस्ती आणि औद्योगिक पट्टा आहे." },
  { slug: "kharadi", name: "Kharadi", about: "Kharadi is an IT hub in east Pune, home to EON IT Park and many office campuses, surrounded by fast-growing residential societies.", nameMr: "खराडी", aboutMr: "खराडी हे पूर्व पुण्यातील आयटी हब आहे. येथे EON आयटी पार्क आणि अनेक ऑफिस कॅम्पस असून आजूबाजूला वेगाने वाढणाऱ्या रहिवासी सोसायट्या आहेत." },
  { slug: "wagholi", name: "Wagholi", about: "Wagholi, on the Pune-Ahilyanagar (Nagar) Road, is a fast-growing residential area with many new housing societies.", nameMr: "वाघोली", aboutMr: "वाघोली पुणे-अहिल्यानगर (नगर) रस्त्यावर असून अनेक नव्या गृहनिर्माण सोसायट्यांमुळे वेगाने वाढणारा रहिवासी भाग आहे." },
  { slug: "fursungi", name: "Fursungi", about: "Fursungi sits on the Pune-Saswad Road beyond Hadapsar and is growing with new residential projects and local commerce.", nameMr: "फुरसुंगी", aboutMr: "फुरसुंगी हडपसरच्या पुढे पुणे-सासवड रस्त्यावर असून नवे रहिवासी प्रकल्प आणि स्थानिक व्यापारामुळे वाढत आहे." },
  { slug: "manjari", name: "Manjari", about: "Manjari is an east Pune neighbourhood near Hadapsar on the Solapur Road, with new housing and the Serum Institute campus nearby.", nameMr: "मांजरी", aboutMr: "मांजरी हा सोलापूर रस्त्यावर हडपसरजवळचा पूर्व पुण्यातील भाग आहे. येथे नवी घरे असून जवळ सीरम इन्स्टिट्यूटचा परिसर आहे." },
  { slug: "viman-nagar", name: "Viman Nagar", about: "Viman Nagar is a busy east Pune locality near the airport, known for Phoenix Marketcity, offices, colleges and a large young population.", nameMr: "विमाननगर", aboutMr: "विमाननगर हा विमानतळाजवळचा पूर्व पुण्यातील गजबजलेला भाग आहे. फिनिक्स मार्केटसिटी, ऑफिसेस, कॉलेजेस आणि मोठी तरुण लोकसंख्या ही याची ओळख आहे." },
  { slug: "magarpatta", name: "Magarpatta", about: "Magarpatta City is a large planned township in Hadapsar with housing, offices and retail in one campus.", nameMr: "मगरपट्टा", aboutMr: "मगरपट्टा सिटी हडपसरमधील मोठी नियोजित टाउनशिप आहे. एकाच कॅम्पसमध्ये घरे, ऑफिसेस आणि रिटेल आहे." },
  { slug: "undri", name: "Undri", about: "Undri is a growing residential area in south-east Pune, close to Kondhwa and NIBM Road.", nameMr: "उंड्री", aboutMr: "उंड्री हा दक्षिण-पूर्व पुण्यातील वाढता रहिवासी भाग आहे, कोंढवा आणि एनआयबीएम रस्त्याजवळ." },
];

export const getArea = (slug: string) => FRANCHISE_AREAS.find((a) => a.slug === slug);

// An area is taken when an active Pizza Mood outlet already sits in it (one outlet per area).
export const isAreaTaken = (area: FranchiseArea, stores: OutletLocation[]) =>
  stores.some(
    (s) => s.status === "active" && (s.area.toLowerCase() === area.name.toLowerCase() || s.address.toLowerCase().includes(area.name.toLowerCase())),
  );

// Devanagari names for areas shown on Marathi pages (store areas come from the DB in English); unknown areas fall back to the English name.
const STORE_AREAS_MR: Record<string, string> = {
  baner: "बाणेर", bavdhan: "बावधन", bibwewadi: "बिबवेवाडी", deccan: "डेक्कन", "ganga dham": "गंगाधाम", hinjawadi: "हिंजवडी", kondhwa: "कोंढवा",
  kothrud: "कोथरूड", narhe: "नऱ्हे", nigdi: "निगडी", parvati: "पर्वती", pimpri: "पिंपरी", ravet: "रावेत", shivane: "शिवणे", wakad: "वाकड", warje: "वारजे",
};
export const areaNameMr = (name: string) =>
  FRANCHISE_AREAS.find((a) => a.name.toLowerCase() === name.toLowerCase())?.nameMr ?? STORE_AREAS_MR[name.toLowerCase()] ?? name;
