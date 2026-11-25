export function effectiveAttributeValue(attribute) {
  return attribute.value + (attribute.increased ?? 0)
}

export function calculateStat(stat, attributesByName) {
  const attributes = stat.attributes?.map((name) => attributesByName.get(name))
  if (!attributes?.length || attributes.some((attribute) => !attribute) || !(stat.divisor > 0)) {
    return stat
  }

  const isCombat = stat.group === 'Kampf'
  const usedAttributes = isCombat
    ? attributes
        .sort(
          (left, right) =>
            effectiveAttributeValue(right) - effectiveAttributeValue(left) ||
            right.value - left.value,
        )
        .slice(0, 2)
    : attributes

  const baseSum = usedAttributes.reduce((sum, attribute) => sum + attribute.value, 0)
  const effectiveSum = usedAttributes.reduce(
    (sum, attribute) => sum + effectiveAttributeValue(attribute),
    0,
  )
  const baseValue = Math.round(baseSum / stat.divisor)
  const effectiveValue = Math.round(effectiveSum / stat.divisor)

  return {
    ...stat,
    value: isCombat ? Math.max(baseValue, effectiveValue) : effectiveValue,
    increased: effectiveValue > baseValue,
  }
}
