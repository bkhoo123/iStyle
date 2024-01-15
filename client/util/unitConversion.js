export function unitConversion(isMetric, value) {
    if (!isMetric) {
        return value * 2.54;
    } else {
        return value / 2.54;
    }
}
