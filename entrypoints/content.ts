import FitgirlImage from "@/assets/fitgirl-icon.jpg";

const FITGIRL_BASE_URL = "https://fitgirl-repacks.site";

const extract_game_title = (steam_url: string): string => {
	const pathname = new URL(steam_url).pathname;

	return pathname.split("/").filter(Boolean).pop() || "";
};

const normalize_game_title = (title: string): string =>
	title.replaceAll("_", "-").toLocaleLowerCase();

const build_fitgirl_url = (steam_url: string): string => {
	const title = extract_game_title(steam_url);
	const normalized_title = normalize_game_title(title);

	return `${FITGIRL_BASE_URL}/${normalized_title}`;
};

export default defineContentScript({
	matches: ["*://store.steampowered.com/app/*/*"],
	main(ctx) {
		const fitgirl_url = build_fitgirl_url(document.URL);
		console.log(fitgirl_url)

		const ui = createIntegratedUi(ctx, {
			position: "inline",
			anchor: ".apphub_OtherSiteInfo",
			tag: "a",
			append: "first",
			onMount: (container) => {
				container.setAttribute("class", "btnv6_blue_hoverfade btn_medium");
				container.setAttribute("href", fitgirl_url);

				const span = document.createElement("span");
				span.setAttribute("data-tooltip-text", "View on FitGirl");
				span.setAttribute("aria-describedby", "tooltip-24");

				const img = document.createElement("img");
				img.setAttribute("src", FitgirlImage);
				img.setAttribute('class', 'ico16')

				span.append(img)

				container.append(span);
			},
		});

		ui.mount();
	},
});
