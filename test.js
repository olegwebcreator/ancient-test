
describe("createAncientSword", function() {
    it("Проверить обладает ли Jovanni знанием предков", function() {
        assert.equal(typeof Jovanni.createAncientSword, 'function');
    });
    it("Проверить умеет ли Petro ковать мечи", function() {
        assert.equal(typeof Petro.createAncientSword,'function');
    });
    it("Проверить умеет ли Lucca ковать мечи", function() {
        assert.equal(typeof Lucca.createAncientSword, 'function');
    });
});

describe("isMyFamilySkill", function() {
    it("проверить является ли навык Jovanni родовым знанием переданным из поколения в поколение", function () {
        assert.equal(Jovanni.isMyFamilySkill('createAncientSword'), true);
    });
    it("проверить украл ли Lucca родовые знания. Ответ true, если украл", function () {
        assert.equal(Jovanni.isMyFamilySkill.bind(Lucca)('createAncientSword'), false);
    });
    it("проверить украл ли Petro родовые знания. Ответ true, если украл", function () {
        assert.equal(Jovanni.isMyFamilySkill.bind(Petro)('createAncientSword'), false);
    });
});

describe("isMyStolenSkill", function() {
    it("проверить украл ли Jovanni навык", function () {
        assert.isFalse(Jovanni.isMyStolenSkill(Jovanni, 'createAncientSword'));
    });
    it("выдать сообщение если навык Lucca позаимствован у Jovanni и изобличить лжеца", function () {
        assert.isTrue(Jovanni.isMyStolenSkill(Lucca, 'createAncientSword'));
    });
    it("выдать сообщение если навык Petro позаимствован у Jovanni и изобличить лжеца", function () {
        assert.isTrue(Jovanni.isMyStolenSkill(Petro, 'createAncientSword'));
    });
});

describe("useManInBlackBlinker", function() {
	it("Забвение не действует на Jovanni", function () {
        assert.isFalse(Jovanni.useManInBlackBlinker(Jovanni, Jovanni));
    });
    it("наложить забвение на лжеца Lucca, чтобы он не мог использовать украденные у указанного объекта навыки", function () {
        assert.isTrue(Jovanni.useManInBlackBlinker(Lucca, Jovanni));
    });
    it("наложить забвение на лжеца Petro, чтобы он не мог использовать украденные у указанного объекта навыки", function () {
        assert.isTrue(Jovanni.useManInBlackBlinker(Petro, Jovanni));
    });
});

describe("forceToConfess", function() {
    it("Jovanni не преступник", function () {
        assert.isFalse(Jovanni.forceToConfess(Jovanni));
    });
    it("Уличить Lucca", function () {
        assert.isTrue(!!Jovanni.forceToConfess(Lucca));
    });
    it("Уличить Petro", function () {
        assert.isTrue(!!Jovanni.forceToConfess(Petro));
    });
});
