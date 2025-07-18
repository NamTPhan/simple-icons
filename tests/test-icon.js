// @ts-check
/**
 * @file Icon tester.
 */

import {strict as assert} from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import {describe, it} from 'mocha';
import {SVG_PATH_REGEX} from '../sdk.mjs';

const iconsDirectory = path.resolve(import.meta.dirname, '..', 'icons');

/**
 * Checks if icon data matches a subject icon.
 * @param {import('../sdk.d.ts').IconData} icon Icon data.
 * @param {import('../types.d.ts').SimpleIcon} subject
 * Icon object to check against icon data.
 * @param {string} slug Icon data slug.
 */
export const testIcon = (icon, subject, slug) => {
	const svgPath = path.resolve(iconsDirectory, `${slug}.svg`);

	describe(icon.title, () => {
		it('has the correct "title"', () => {
			assert.equal(subject.title, icon.title);
		});

		it('has the correct "slug"', () => {
			assert.equal(subject.slug, slug);
		});

		it('has the correct "hex" value', () => {
			assert.equal(subject.hex, icon.hex);
		});

		it('has the correct "source"', () => {
			assert.equal(subject.source, icon.source);
		});

		it('has an "svg" value', () => {
			assert.equal(typeof subject.svg, 'string');
		});

		it('has a valid "path" value', () => {
			assert.match(subject.path, SVG_PATH_REGEX);
		});

		it(`has ${icon.guidelines ? 'the correct' : 'no'} "guidelines"`, () => {
			if (icon.guidelines) {
				assert.equal(subject.guidelines, icon.guidelines);
			} else {
				assert.equal(subject.guidelines, undefined);
			}
		});

		it(`has ${icon.license ? 'the correct' : 'no'} "license"`, () => {
			if (icon.license) {
				assert.equal(subject.license?.type, icon.license.type);
				if (icon.license.type === 'custom') {
					const {license} = icon;
					const license_ = /** @type {import('../types.js').CustomLicense} */ (
						license
					);
					assert.equal(subject.license.url, license_.url);
				}
			} else {
				assert.equal(subject.license, undefined);
			}
		});

		it('has a valid svg value', async () => {
			const svgFileContents = await fs.readFile(svgPath, 'utf8');
			assert.equal(subject.svg, svgFileContents);
		});
	});
};
