export const valuePx = {
	mobileS: 309,
	mobileM: 375,
	mobileL: 463,
	tabletS: 750,
	tablet: 830,
	laptop: 1124,
	laptopM: 1248,
	laptopL: 1440,
	desktop: 2560,
};

export const size = {
	mobileS: `${valuePx.mobileS}px`,
	mobileM: `${valuePx.mobileM}px`,
	mobileL: `${valuePx.mobileL}px`,
	tabletS: `${valuePx.tabletS}px`,
	tablet: `${valuePx.tablet}px`,
	laptop: `${valuePx.laptop}px`,
	laptopM: `${valuePx.laptopM}px`,
	laptopL: `${valuePx.laptopL}px`,
	desktop: `${valuePx.desktop}px`,
};

export const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tabletS: `(max-width: ${size.tabletS})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopM: `(max-width: ${size.laptopM})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktop})`,
};
