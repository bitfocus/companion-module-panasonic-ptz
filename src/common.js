import { MODELS, SERIES_SPECS } from './models.js'

export function getAndUpdateSeries(self) {
	// Set the model and series selected, if in auto, detect what model is connected via TCP
	if (self.config.model === 'Auto') {
		self.data.model = self.data.modelINFO
	} else {
		self.data.model = self.config.model
	}

	if (self.data.model !== null) {
		self.data.series = MODELS.find((MODELS) => MODELS.id === self.data.model).series
	}

	// Find the specific commands for a given series
	let SERIES =
		self.data.series !== 'Auto' && self.data.series !== 'Other'
			? SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id === self.data.series)
			: undefined

	return SERIES || SERIES_SPECS.find((SERIES_SPECS) => SERIES_SPECS.id === 'Other')
}

export function getNext(values, key, step = 1, overrun = true) {
	const firstIndex = 0
	const lastIndex = values.length - 1
	let i = values.findIndex((v) => v.id === key)

	if (i < firstIndex) return values[firstIndex] // case not found
	if (!overrun) {
		if (i + step < firstIndex) return values[firstIndex]
		if (i + step > lastIndex) return values[lastIndex]
	}
	return values[(values.length + (step % values.length) + i) % values.length]
}

export function getNextValue(value, min, max, step = 1) {
	let v = value += step
	if (v > max) {
		v = max
	}
	if (v < min) {
		v = min
	}	
	return v
}

export function getLabel(values, key) {
	return values.find((v) => v.id === key)?.label
}

export function toHexString(value, length) {
	return parseInt(value).toString(16).toUpperCase().padStart(length, '0')
}