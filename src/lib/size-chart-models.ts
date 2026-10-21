import mediumPhoto from "@/assets/size-chart-model-medium.jpeg.asset.json";
import smallPhoto from "@/assets/size-chart-model-small.jpeg.asset.json";

export const SIZE_CHART_MODELS = [
  { image: mediumPhoto.url, size: "M", height: "5’11”", alt: "Model wearing the Kinara shirt in size M" },
  { image: smallPhoto.url, size: "S", height: "5’8”", alt: "Model wearing the Kinara shirt in size S" },
] as const;