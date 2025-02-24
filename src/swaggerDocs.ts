/**
 * @openapi
 * /rates:
 *   get:
 *     summary: Získanie výmenných kurzov
 *     description: Vráti zoznam výmenných kurzov z databázy.
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Dátum vo formáte YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       currency:
 *                         type: string
 *                       rate:
 *                         type: number
 *
 * /extremes:
 *   get:
 *     summary: Získanie extrémnych kurzov
 *     description: Vráti najvyšší a najnižší kurz medzi dvoma menami v danom období.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Počiatočný dátum vo formáte YYYY-MM-DD
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Koncový dátum vo formáte YYYY-MM-DD
 *       - in: query
 *         name: currencyFrom
 *         schema:
 *           type: string
 *         description: Mena, z ktorej sa prevádza
 *       - in: query
 *         name: currencyTo
 *         schema:
 *           type: string
 *         description: Mena, do ktorej sa prevádza
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 max:
 *                   type: number
 *                 min:
 *                   type: number
 */
