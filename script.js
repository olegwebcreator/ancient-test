/*
В некотором городе жил был молодой объект Jovanni. Его предки были ремесленниками и обучили его многому,
в т.ч. ковать мечи особым методом createAncientSword() */

var Jovanni = (function() {

    function JovanniParent() {
        this.createAncientSword = function() {
            console.log("Do some magic for creating ancient magical sword!");
        }
    }

    function Jovanni() {}

    Jovanni.prototype = new JovanniParent();

    return new Jovanni();

})();

//Но были в городе и проходимцы вроде объектов Lucca и Petro, которые прознали родовой рецепт Jovanni
//по изготовлению мечей и обратились к градоначальнику с требованием запретить
//Jovanni использовать этот метод кования мечей, под предлогом, что это он украл у них эту родовую тайну!


var Lucca = {};
var Petro = {};

Lucca.createAncientSword = Jovanni.createAncientSword;
Petro.createAncientSword = Jovanni.createAncientSword;

// Помогите Jovanni реализовать 4 метода, чтобы:

// проверить является ли навык (метод) родовым знанием переданным из поколения в поколение
// (иначе говоря может быть унаследован не только от отца, но и от деда, прадеда итд.)
Jovanni.isMyFamilySkill = function(skillName) {
    return this[skillName] === this.__proto__[skillName];
}

// выдать сообщение если навык позаимствован у Jovanni и изобличить лжеца
Jovanni.isMyStolenSkill = function(criminalScumObject, skillName) {

    if (criminalScumObject.hasOwnProperty(skillName) && criminalScumObject[skillName] === Jovanni[skillName] && 
    	(typeof criminalScumObject[skillName] == 'function')) {
			console.log('He\'s dirty bastard!');
			return true;
    }
    return false; 
};

// наложить забвение на лжеца, чтобы он не мог использовать украденные у указанного объекта навыки
Jovanni.useManInBlackBlinker = function(criminalScumObject, authorObject) {

	var spell = false;
	if (authorObject !== criminalScumObject) {
		for ( var key in criminalScumObject ) {
			if (criminalScumObject[key] === authorObject[key]) {
				Object.defineProperty(criminalScumObject, key, { 
					get: function() {
						return function() {
							console.log("I got some spells, I can't use this skill");
							return false;
						}
 					}
				});	
				spell = true;
			}
		}
	}
	return spell;
}

// заставить преступника раскаяться и выдать все методы, которые он украл,
// а не получил в наследство от предков
// Реализовать метод confess у преступника в рамках данного метода
Jovanni.forceToConfess = function(criminalScumObject) {

    var artisan = this;

    criminalScumObject.confess = function() {

        var methods = [],
            parentObject = Object.getPrototypeOf(this);

        if ( artisan !== this ) {

            for ( var key in this ) {

                if ( parentObject[key] ) {
                    continue;
                }

                if ( artisan[key] ) {
                    methods.push(key);
                }
            }

             Object.defineProperty(criminalScumObject, 'confess', {
                 enumerable: false
             });

        }

        return methods.length ? methods : false;
    }
    if ( criminalScumObject.confess() ) {
        console.log( criminalScumObject.confess() );
    };
    return criminalScumObject.confess();
};


// Предложите реализацию Jovanni, которая будет хитрее и не позволит украсть свои навыки
// (все доступные методы можно вызвать но нельзя передать по ссылке)
function EnchancedJovanny() {
    this.createNewAncientSword = function() {
        console.log("Do some magic for creating enchanced enchanced ancient magical sword!");
    };
    this.createEnchancedAncientSword = function() {
        this.createNewAncientSword();
    };

    Object.defineProperties(this, {
        'createAncientSword': {
            writable: false,
            enumerable: false,
            configurable: false
        }
    });

}

var SmartJovanni = new EnchancedJovanny();

SmartJovanni.createEnchancedAncientSword();

// Реализуйте хотя-бы одного потомка Jovanni, которым передадутся все его знания и
// методы чтобы вновь предотвратить заговор,
// но чтобы при этом их нельзя было украсть

// Запутался в решении. Не очень понял, как правильно отнаследоваться от Jovanni
function JovanniChild() {
    var Father = function() {
        return new function() {
            return Jovanni;
        };
    };
    return new Father;
}

var Child = new JovanniChild();
