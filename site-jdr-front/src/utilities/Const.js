export const TYPES = {
  SYSTEM : 1,
  PLAYER_CHARACTER : 2,
  ANNEX : 3,
  ROLEPLAY_GAME : 4,
  SESSION : 5,
  USER : 6,
  NON_PLAYER_CHARACTER : 7,
  COMMENT : 8,
  DICE : 9,
  LINK : 10,
};

export const STATUS = {
  1 : 'A venir',
  2 : 'En cours',
  3 : 'Terminé'
}

export const HOST = "http://localhost:1337";

export const ERRORS = {
  wrongId : "Aucun article ne porte ce numéro"
};

export const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1 )) + min;
}
