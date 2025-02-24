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
 * /exchange_api/extremes:
 *   get:
 *     summary: Ziskanie extremov minima a maxima kurzu
 *     description: Vrati najmensi a najvacsi kurz pre zvolene meny a datumove rozpatie.
 *     parameters:
 *       - in: query
 *         name: base_code
 *         schema:
 *           type: string
 *           format: string
 *         description: Kód meny, pre ktorú sa majú získať kurzy
 *         required: true
 *       - in: query
 *         name: target_code
 *         schema:
 *           type: string
 *           format: string
 *         description: Kod meny, voci ktorej sa maju ziskat kurzy
 *         required: true
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Dátum vo formáte YYYY-MM-DD od kedy sa majú získať kurzy
 *         required: true
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Dátum vo formáte YYYY-MM-DD do kedy sa majú získať kurzy
 *         required: true
 *     responses:
 *       200:
 *         description: Úspešná odpoveď
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: number
 *                   format: float
 *                 max:
 *                   type: number
 *                   format: float
 */
