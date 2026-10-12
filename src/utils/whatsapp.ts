import type { Game } from '../types/game';

// Store WhatsApp Contact Number (can be updated with your actual business number)
export const DEFAULT_WHATSAPP_NUMBER = '+20 12 22253401';

/**
 * Generates a pre-filled WhatsApp ordering URL for a specific PlayStation game
 */
export function getWhatsAppOrderUrl(game: Game, phoneNumber: string = DEFAULT_WHATSAPP_NUMBER): string {
  // Clean phone number (keep digits only)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  const platformsText = game.platforms.join(' / ');
  const priceText = game.price ? game.price : 'Inquire for pricing';

  const message = [
    `ZEROONE — PlayStation Order Request*`,
    ``,
    `Hello ZEROONE! I would like to buy:`,
    ` Game:* ${game.title}`,
    ` Platform:* ${platformsText}`,
    ` Price:* ${priceText}`,
    ` Genre:* ${game.genre}`,
    ``,
    `Could you please confirm availability and payment/delivery details? Thank you!`,
  ].join('\n');

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Directly opens WhatsApp in a new tab with the game order details
 */
export function redirectToWhatsApp(game: Game, phoneNumber?: string): void {
  const url = getWhatsAppOrderUrl(game, phoneNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}
