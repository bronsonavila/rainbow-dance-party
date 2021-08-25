// Returns the number of decimal places in a stringified float (e.g., '0.001' => 3).
export const getDecimalPlaces = (floatStr: string): number =>
  floatStr.split('.')[1]?.length || 0

// See: https://attacomsian.com/blog/javascript-detect-mobile-device
export const getDeviceType = (): string => {
  const ua = navigator.userAgent

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile'
  }

  return 'desktop'
}
