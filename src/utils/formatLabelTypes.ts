/**
 * Custom mapping dictionary for specific types that require special formatting.
 */

const customMapping: Record<string, string> = {
  PROJECTMANAGE: 'Management de projet',
  EVENT: 'Événementiel',
};

/**
 * Formats a skill type into a more user-friendly readable format.
 * If the type is in customMapping, it will be replaced by the custom version.
 *
 * @param type - The raw type to format
 * @returns The formatted type
 */

export function formatType(type: string): string {

  if (customMapping[type.toUpperCase()]) {
    return customMapping[type.toUpperCase()];
  }

  return type
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}