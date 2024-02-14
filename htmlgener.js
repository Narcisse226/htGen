#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');

// Liste des balises auto-fermantes avec leurs attributs essentiels
const selfClosingTagsWithAttributes = new Map([
  ['area', { attributes: ['alt', 'coords', 'shape', 'href'] }],
  ['base', { attributes: ['href', 'target'] }],
  ['br', { attributes: [] }],
  ['col', { attributes: ['span'] }],
  ['command', { attributes: ['type', 'label'] }],
  ['embed', { attributes: ['src', 'type'] }],
  ['hr', { attributes: [] }],
  ['img', { attributes: ['src', 'alt'] }],
  ['input', { attributes: ['type', 'name', 'value'] }],
  ['keygen', { attributes: ['keytype', 'name'] }],
  ['link', { attributes: ['rel', 'href'] }],
  ['meta', { attributes: ['charset', 'content'] }],
  ['param', { attributes: ['name', 'value'] }],
  ['source', { attributes: ['src', 'type'] }],
  ['track', { attributes: ['kind', 'src'] }],
  ['wbr', { attributes: [] }],
]);

program
  .version('1.0.0')
  .description('HTML Generator');

// Utilisation de la commande principale (sans sous-commande)
program
  .arguments('<elements...>')
  .action((elements) => {
    let generatedHtml = '';
    let stack = [];
    let indentation = 0;

    const addIndentation = () => '  '.repeat(Math.max(0, indentation));

    elements.forEach((element) => {
      const parts = element.split(/(?=[.#/])/);
      const tag = parts.shift(); // La première partie est toujours le tag
      const classes = [];
      const id = parts.find(part => part.startsWith('#'))?.substring(1);

      // Collecter les classes et les IDs
      parts.forEach(part => {
        if (part.startsWith('.')) {
          classes.push(part.substring(1));
        }
      });

      const isSelfClosing = selfClosingTagsWithAttributes.has(tag.toLowerCase());
      const closing = element.endsWith('/');

      if (closing) {
        indentation--;
      }

      let tagString = `${addIndentation()}<${tag}`;

      if (id) {
        tagString += ` id="${id}"`;
      }

      if (classes.length > 0) {
        tagString += ` class="${classes.join(' ')}"`;
      }

      // Ajouter des attributs spécifiques si la balise est auto-fermante et a des attributs spécifiés
      if (isSelfClosing) {
        selfClosingTagsWithAttributes.get(tag.toLowerCase()).attributes.forEach(attribute => {
          tagString += ` ${attribute}="valeur_${attribute}"`;
        });
        tagString += ' />';
      } else {
        tagString += '>';

        if (!closing) {
          stack.push(tag);
          indentation++;
        }
      }

      generatedHtml += tagString;

      if (closing && !isSelfClosing) {
        // Fermer immédiatement la balise spécifiée
        generatedHtml += `\n${addIndentation()}</${tag}>`;
      }
    });

    // Fermer toutes les balises ouvertes restantes
    while (stack.length > 0) {
      const lastTag = stack.pop();
      indentation--;
      generatedHtml += `\n${addIndentation()}</${lastTag}>`;
    }

    // Enregistrer le HTML dans un fichier
    fs.writeFileSync('outGenhtml.html', generatedHtml);

    console.log('HTML généré avec succès et enregistré dans outGenhtml.html');
  });

// Fermeture de l'interface readline après exécution
program.parse(process.argv);
