/**
 * @openapi
 * /exchange_api/current:
 *   get:
 *     summary: Ziskanie aktualneho kurzu
 *     description: Vrati zoznam kurzov pre zvolenu menu vo vsetkych dostupnych menach.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *           format: string
 *         description: Kód meny, pre ktorú sa majú získať kurzy
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base_code:
 *                   type: string
 *                 conversion_rate:
 *                   type: object
 *
 * /exchange_api/historical:
 *   get:
 *     summary: Ziskanie kurzu na zvoleny datum v minulosti
 *     description: Vráti kurz pre zvolenú menu na zvolený dátum v minulosti.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *           format: string
 *         description: Kód meny, pre ktorú sa majú získať kurzy
 *         required: true
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Dátum vo formáte YYYY-MM-DD
 *         required: true
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base_code:
 *                   type: string
 *                 date:
 *                   type: string
 *                 conversion_rate:
 *                   type: object
 *
 * /exchange_api/update-codes:
 *   get:
 *     summary: Ziskanie vsetkych dostupnych kodov mien
 *     description: Vrati zoznam vsetkych dostupnych kodov mien.
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 codes:
 *                   type: array
 *
 */
