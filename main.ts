namespace SpriteKind {
    export const Nemico_potenziato = SpriteKind.create()
    export const Guardia_Portale = SpriteKind.create()
    export const Boss_finale = SpriteKind.create()
    export const blocco = SpriteKind.create()
    export const Narratore1 = SpriteKind.create()
    export const Narratore2 = SpriteKind.create()
    export const Cristallofuoco = SpriteKind.create()
    export const Attacco_sfera_fuoco = SpriteKind.create()
    export const CristalloGhiaccio = SpriteKind.create()
    export const Narratore_3 = SpriteKind.create()
    export const Attacco_sfera_ghiaccio = SpriteKind.create()
    export const Narratore_4 = SpriteKind.create()
    export const Narratore_5 = SpriteKind.create()
    export const Personaggio1 = SpriteKind.create()
    export const Personaggio2 = SpriteKind.create()
    export const Regina = SpriteKind.create()
    export const Contadino = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Nemico_potenziato, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`muro distrutto`)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore_3, function (sprite, otherSprite) {
    otherSprite.sayText("Attento! Il mostro sta scappando con il cristallo!", 4000, true)
    pause(5000)
    otherSprite.sayText("Usa il fuoco per fargli del danno, è il suo punto debole!", 6000, true)
    pause(5000)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
// NEMICI
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss_finale, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    pause(1000)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Regina, function (sprite, otherSprite) {
    if (progressoCittà == 2) {
        if (true) {
            otherSprite.sayText("Risolvi l'enigma", 7000, true)
        } else {
            otherSprite.sayText("Ecco a te la bacchetta 🪄", 7000, true)
        }
    } else {
        otherSprite.sayText("Sparisci della mia vista, plebeo!", 5000, true)
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Ghiaccio_3`, function (sprite, location) {
    if (sprite == Attaccofuoco) {
        tiles.setTileAt(location, assets.tile`tel mappa centrale`)
    }
    sprites.destroy(sprite)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Personaggio1, function (sprite, otherSprite) {
    if (progressoCittà == 0) {
        if (BANANNA == false) {
            otherSprite.sayText("Portami una banana!", 2000, true)
        } else if (BANANNA == true) {
            otherSprite.sayText("Grazie per la banana! 🍌", 2000, true)
            pause(2000)
            progressoCittà = 1
        }
    } else {
        otherSprite.sayText("🍌Gnam🍌", 1000, true)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 3
})
function spriteCittà () {
    PersonaggioCittà1 = sprites.create(assets.image`scimmia`, SpriteKind.Personaggio1)
    tiles.placeOnRandomTile(PersonaggioCittà1, assets.tile`spawnPersonaggio`)
    PersonaggioCittà2 = sprites.create(assets.image`personaggio2`, SpriteKind.Personaggio2)
    if (AIutantequest) {
        tiles.placeOnRandomTile(PersonaggioCittà2, assets.tile`Spawn aiutante quest`)
    } else {
        tiles.placeOnRandomTile(PersonaggioCittà2, assets.tile`spawnPersonaggio`)
        PersonaggioCittà2.y += -16
    }
    ReginaCittà = sprites.create(assets.image`regina`, SpriteKind.Regina)
    tiles.placeOnRandomTile(ReginaCittà, assets.tile`spawnPersonaggio`)
}
// Game Over
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.blocco, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Il cristallo è stato rubato!")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Portaaperta`, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.floorLight2)
    Nemico_potenziato_ = sprites.create(assets.image`Nemico potenziato`, SpriteKind.Nemico_potenziato)
    Nemico_potenziato_.setPosition(21 * 16, 4 * 16)
    Uscita = sprites.create(assets.image`asddassad`, SpriteKind.blocco)
    Uscita.setPosition(20 * 16, 37 * 16)
    Nemico_potenziato_.follow(Uscita, 20)
    VitaNemicoPotenziato = 5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Contadino_dialogo2 && zona_corrente == 2) {
        Contadino.sayText("Va bene, sarà per la prossima volta", 3000, true)
    }
    if (direzionecolpo == 1) {
        vx = 110
        vy = 0
    } else if (direzionecolpo == 2) {
        vx = -110
        vy = 0
    } else if (direzionecolpo == 4) {
        vx = 0
        vy = 110
    } else if (direzionecolpo == 3) {
        vx = 0
        vy = -110
    }
    if (ghiaccio) {
        AttaccoGhiaccio = sprites.createProjectileFromSprite(assets.image`Attacco di ghiaccio`, mySprite, vx, vy)
        pause(1000)
        sprites.destroy(AttaccoGhiaccio)
        pause(1000)
    } else if (fuoco) {
        Attaccofuoco = sprites.createProjectileFromSprite(assets.image`Attacco di fuoco`, mySprite, vx, vy)
        pause(1000)
        sprites.destroy(Attaccofuoco)
        pause(1000)
    }
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Personaggio2, function (sprite, otherSprite) {
    if (progressoCittà == 0) {
        otherSprite.sayText("Dov'è la mia scimmia?...", 2000, true)
        pause(2000)
    }
    if (progressoCittà == 1) {
        if (Perso_personaggio2) {
            otherSprite.sayText("Dobbiamo riprovarci! Se vuoi la bacchetta devi scortarmi fino a lì!", 7000, true)
        } else if (Vittoria == true) {
            otherSprite.sayText("Grazie mille per l'aiuto!", 4000, true)
            pause(4000)
            otherSprite.sayText("Parlerò bene di te alla regina!", 4000, true)
            pause(4000)
            AIutantequest = false
            progressoCittà = 2
        }
        if (AIutantequest) {
            otherSprite.sayText("Andiamo!", 2000, true)
        } else {
            otherSprite.sayText("Sei amico della mia scimmia... forse puoi aiutarmi ... ", 7000, true)
            pause(7000)
            otherSprite.sayText("Io dovrei andare dal medico sulla strada settentrionale... ", 5000, true)
            pause(5000)
            otherSprite.sayText("...ma quel posto è infestato di mostri!", 5000, true)
            pause(5000)
            otherSprite.sayText("Se mi scortassi fino a destinazione potrei parlare bene di te alla regina...", 7000, true)
            pause(7000)
            otherSprite.sayText("Io ti aspetterò all'ingresso della strada Nord", 6500, true)
            pause(6500)
            otherSprite.sayText("Ci vediamo lì, ciaooo", 3000, true)
            pause(3000)
            tiles.placeOnRandomTile(otherSprite, assets.tile`Spawn aiutante quest`)
            AIutantequest = true
        }
    } else if (progressoCittà == 2) {
        otherSprite.sayText("Grazie mille per l'aiuto", 4000, true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Nemico_potenziato, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(1000)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore2, function (sprite, otherSprite) {
    Sferadaprendere = sprites.create(assets.image`sferadaprendere`, SpriteKind.Cristallofuoco)
    Sferadaprendere.setPosition(21 * 16, 5 * 16)
    otherSprite.sayText("Grazie mille per aver protetto il villaggio!", 5000, true)
    pause(5000)
    otherSprite.sayText("In tutto il mondo, i mostri stanno cercando di rubare i cristalli ", 6000, true)
    pause(5000)
    otherSprite.sayText("I cristalli sono 3: il cristallo di fuoco, quello che abbiamo protetto oggi,", 7000, true)
    pause(6000)
    otherSprite.sayText("il cristallo di ghiaccio, custodito al castello,", 5000, true)
    pause(5000)
    otherSprite.sayText("e, infine, il cristallo dei fulmini, che i mostri hanno già rubato", 5500, true)
    pause(5000)
    otherSprite.sayText("Le tue sole forze non basteranno per contrastare l'invasione", 5000, true)
    pause(5000)
    otherSprite.sayText("Prendi il cristallo di fuoco, e usa i suoi poteri per uscire di qui!", 5500, true)
    pause(5000)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Contadino, function (sprite, otherSprite) {
    if (Contadinodialogo1) {
        if (sprite == AttaccoGhiaccio) {
            sprites.destroy(sprite, effects.spray, 500)
            otherSprite.sayText("Ah, ci voleva proprio una bella rinfrescata", 5000, true)
            pause(5000)
            otherSprite.sayText("Ecco a te le banane, come promesso", 5000, true)
            BANANNA = true
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Contadino_dialogo2 && zona_corrente == 2) {
        Contadino.sayText("Grazie mille amico", 2000, true)
        pause(2000)
        Contadino.sayText("Fa un caldo di questi giorni, se potessi rinfrescarmi un po' te ne sarei grato", 7000, true)
        pause(7000)
        Contadinodialogo1 = true
    }
    if (direzionecolpo == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . 1 b . . 
            . . . . . . . . . . . . 1 b . . 
            . . . . . . . . . . . . . b . . 
            . . . . . . . . . . . . 1 b . . 
            . . . . . . . . . . . . . b . . 
            . . . . . . . . . . . . 1 b . . 
            . . . . . . . . . . . . b . . . 
            . . . . . . . . . . 1 . b . . . 
            . . . . . . . . . . . b . . . . 
            . . . . . . . . . 1 b . . . . . 
            . . . . . . . . . b . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . 1 . 1 . b b . . . . . . . . 
            b b b b b b 1 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 100, 0)
        pause(100)
        sprites.destroy(projectile)
        animation.runImageAnimation(
        mySprite,
        [img`
            ........................
            ....ffffff..............
            ..ffeeeef2f.............
            .ffeeeef222f............
            .feeeffeeeef...cc.......
            .ffffee2222ef.cdc.......
            .fe222ffffe2fcddc.......
            fffffffeeeffcddc........
            ffe44ebf44ecddc.........
            fee4d41fddecdc..........
            .feee4dddedccc..........
            ..ffee44e4dde...........
            ...f222244ee............
            ...f2222e2f.............
            ...f444455f.............
            ....ffffff..............
            .....fff................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ........................
            .......fff..............
            ....fffff2f.............
            ..ffeeeee22ff...........
            .ffeeeeee222ff..........
            .feeeefffeeeef..........
            .fffffeee2222ef.........
            fffe222fffffe2f.........
            fffffffffeeefff.....cc..
            fefe44ebbf44eef...ccdc..
            .fee4d4bbfddef..ccddcc..
            ..feee4dddddfeecdddc....
            ...f2222222eeddcdcc.....
            ...f444445e44ddccc......
            ...ffffffffeeee.........
            ...fff...ff.............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            .......ff...............
            ....ffff2ff.............
            ..ffeeeef2ff............
            .ffeeeeef22ff...........
            .feeeeffeeeef...........
            .fffffee2222ef..........
            fffe222ffffe2f..........
            ffffffffeeefff..........
            fefe44ebf44eef..........
            .fee4d4bfddef...........
            ..feee4dddee.c..........
            ...f2222eeddeccccccc....
            ...f444e44ddecddddd.....
            ...fffffeeee.ccccc......
            ..ffffffff...c..........
            ..fff..ff...............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ....ffffff..............
            ..ffeeeef2f.............
            .ffeeeef222f............
            .feeeffeeeef............
            .ffffee2222ef...........
            .fe222ffffe2f...........
            fffffffeeefff...........
            ffe44ebf44eef...........
            fee4d41fddef............
            .feee4ddddf.............
            ..fdde444ef.............
            ..fdde22ccc.............
            ...eef22cdc.............
            ...f4444cddc............
            ....fffffcddc...........
            .....fff..cddc..........
            ...........cdc..........
            ............cc..........
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ......ffff..............
            ....fff22fff............
            ...fff2222fff...........
            ..fffeeeeeefff..........
            ..ffe222222eef..........
            ..fe2ffffff2ef..........
            ..ffffeeeeffff..........
            .ffefbf44fbfeff.........
            .fee41fddf14eef.........
            ..ffffdddddeef..........
            .fddddf444eef...........
            .fbbbbf2222f4e..........
            .fbbbbf2222fd4..........
            ..fccf45544f44..........
            ...ffffffff.............
            .....ff..ff.............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `],
        100,
        false
        )
    } else if (direzionecolpo == 2) {
        projectile = sprites.createProjectileFromSprite(assets.image`myImage`, mySprite, -100, 0)
        pause(150)
        sprites.destroy(projectile)
        animation.runImageAnimation(
        mySprite,
        [img`
            ..............ffffff....
            .............f2feeeeff..
            ............f222feeeeff.
            .......cc...feeeeffeeef.
            .......cdc.fe2222eeffff.
            .......cddcf2effff222ef.
            ........cddcffeeefffffff
            .........cddce44fbe44eff
            ..........cdceddf14d4eef
            ..........cccdeddd4eeef.
            ...........edd4e44eeff..
            ............ee442222f...
            .............f2e2222f...
            .............f554444f...
            ..............ffffff....
            ................fff.....
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ........................
            ..............fff.......
            .............f2fffff....
            ...........ff22eeeeeff..
            ..........ff222eeeeeeff.
            ..........feeeefffeeeef.
            .........fe2222eeefffff.
            .........f2efffff222efff
            ..cc.....fffeeefffffffff
            ..cdcc...fee44fbbe44efef
            ..ccddcc..feddfbb4d4eef.
            ....cdddceefddddd4eeef..
            .....ccdcddee2222222f...
            ......cccdd44e544444f...
            .........eeeeffffffff...
            .............ff...fff...
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ...............ff.......
            .............ff2ffff....
            ............ff2feeeeff..
            ...........ff22feeeeeff.
            ...........feeeeffeeeef.
            ..........fe2222eefffff.
            ..........f2effff222efff
            ..........fffeeeffffffff
            ..........fee44fbe44efef
            ...........feddfb4d4eef.
            ..........c.eeddd4eeef..
            ....ccccccceddee2222f...
            .....dddddcedd44e444f...
            ......ccccc.eeeefffff...
            ..........c...ffffffff..
            ...............ff..fff..
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ..............ffffff....
            .............f2feeeeff..
            ............f222feeeeff.
            ............feeeeffeeef.
            ...........fe2222eeffff.
            ...........f2effff222ef.
            ...........fffeeefffffff
            ...........fee44fbe44eff
            ............feddf14d4eef
            .............fdddd4eeef.
            .............fe444eddf..
            .............ccc22eddf..
            .............cdc22fee...
            ............cddc4444f...
            ...........cddcfffff....
            ..........cddc..fff.....
            ..........cdc...........
            ..........cc............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ........................
            .....ffff...............
            ...fff22fff.............
            ..fff2222fff............
            .fffeeeeeefff...........
            .ffe222222eef...........
            .fe2ffffff2ef...........
            .ffffeeeeffff...........
            ffefbf44fbfeff..........
            fee41fddf14eef..........
            .ffffdddddeef...........
            fddddf444eef............
            fbbbbf2222f4e...........
            fbbbbf2222fd4...........
            .fccf45544f44...........
            ..ffffffff..............
            ....ff..ff..............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `],
        100,
        false
        )
    } else if (direzionecolpo == 4) {
        projectile = sprites.createProjectileFromSprite(assets.image`attacco inbasso`, mySprite, 0, 100)
        pause(100)
        sprites.destroy(projectile)
        animation.runImageAnimation(
        mySprite,
        [img`
            ........................
            .....ffff...............
            ...fff22fff.............
            ..fff2222fff............
            .fffeeeeeefff...........
            .ffe222222eef...........
            .fe2ffffff2ef...........
            .ffffeeeeffff...........
            ffefbf44fbfeff..........
            fee41fddf14eef..........
            .ffffdddddeef...........
            fddddf444eef............
            fbbbbf2222f4e...........
            fbbbbf2222fd4...........
            .fccf45544f44...........
            ..ffffffff..............
            ....ff..ff..............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ........................
            ......ffff..............
            ....fff22fff............
            ...fff2222fff...........
            ..fffeeeeeefff..........
            ..ffe222222eef..........
            ..fe2ffffff2ef..........
            ..ffffeeeeffff..........
            .ffefbf44fbfeff.........
            .fee41fddf14eef.........
            fdfeeddddd4eff..........
            fbffee444edd4e..........
            fbf4f2222edde...........
            fcf.f22cccee............
            .ff.f44cdc4f............
            ....fffddcff............
            .....fddcff.............
            ....cddc................
            ....cdc.................
            ....cc..................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ........................
            ........................
            .......ff...............
            .....ff22ff.............
            ...fff2222fff...........
            ..fff222222fff..........
            ..fff222222fff..........
            ..feeeeeeeeeeff.........
            .ffe22222222eff.........
            .fffffeeeefffff.........
            fdfefbf44fbfeff.........
            fbfe41fddf14ef..........
            fbffe4dddd4efe..........
            fcfef22222f4e...........
            .ff4f44554f4e...........
            ....ffffffdde...........
            .....ffffedde...........
            ..........ee............
            .........ccc............
            ........cc1cc...........
            .........c1c............
            .........c1c............
            .........c1c............
            .........c1c............
            `,img`
            ......ffff..............
            ....fff22fff............
            ...fff2222fff...........
            ..fffeeeeeefff..........
            ..ffe222222eef..........
            ..fe2ffffff2ef..........
            ..ffffeeeeffff......ccc.
            .ffefbf44fbfeff....cddc.
            .ffefbf44fbfeff...cddc..
            .fee4dddddd4eef.ccddc...
            fdfeeddddd4eeffecddc....
            fbffee4444ee4fddccc.....
            fbf4f222222f1edde.......
            fcf.f222222f44ee........
            .ff.f445544f............
            ....ffffffff............
            .....ff..ff.............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `,img`
            ......ffff..............
            ....fff22fff............
            ...fff2222fff...........
            ..fffeeeeeefff..........
            ..ffe222222eef..........
            ..fe2ffffff2ef..........
            ..ffffeeeeffff..........
            .ffefbf44fbfeff.........
            .fee41fddf14eef.........
            ..ffffdddddeef..........
            .fddddf444eef...........
            .fbbbbf2222f4e..........
            .fbbbbf2222fd4..........
            ..fccf45544f44..........
            ...ffffffff.............
            .....ff..ff.............
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            ........................
            `],
        100,
        false
        )
    }
    pause(500)
})
function closeinventory () {
    Inventarioaperto = false
    controller.moveSprite(mySprite)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Personaggio2, function (sprite, otherSprite) {
    Vita_personaggio2 += -1
    pause(2000)
    if (Vita_personaggio2 == 0) {
        tiles.setCurrentTilemap(tilemap`tileMapTrieste`)
        tiles.placeOnRandomTile(mySprite, assets.tile`Spawn aiutante quest`)
        tiles.placeOnRandomTile(otherSprite, assets.tile`Spawn aiutante quest`)
        Perso_personaggio2 = true
        Vita_personaggio2 = 15
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 2
    selectedIndex = Math.max(selectedIndex - 1, 0)
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Ghiaccio_1`, function (sprite, location) {
    if (sprite == Attaccofuoco) {
        tiles.setTileAt(location, sprites.castle.tilePath5)
    }
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Blocco teletrasporto portale`, function (sprite, location) {
    if (zona_corrente == 7) {
        cambiaZona(3)
    } else {
        cambiaZona(7)
    }
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore_4, function (sprite, otherSprite) {
    Narratore_4_.sayText("Non sei ancora pronto per affrontare l'Invasione", 7000, true)
    pause(7000)
    Narratore_4_.sayText("Nella città si dice che vi sia nascosta una bacchetta,", 7000, true)
    pause(7000)
    Narratore_4_.sayText("Potrebbe canalizzare il potere del cristallo e renderti più potente!", 7000, true)
    pause(7000)
    Narratore_4_.sayText("Cosa aspetti, presto,valla a cercare!", 7000, true)
    pause(7000)
    CIttàaperta = true
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore1, function (sprite, otherSprite) {
    otherSprite.sayText("I mostri ci stanno attaccando! Proteggi il cristallo, presto!", 7000, true)
    pause(7000)
    otherSprite.sayText("Per attaccare premi \"A\" muovendoti nella direzione nella quale vuoi che vada il colpo", 7000, true)
    pause(7000)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Teletrasporto per morte`, function (sprite, location) {
    if (zona_corrente == 4) {
        cambiaZona(3)
    } else {
        cambiaZona(4)
    }
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore_5, function (sprite, otherSprite) {
    otherSprite.sayText("Il tuo prossimo obiettivo è il castello", 7000, true)
    pause(7000)
    otherSprite.sayText("Sembra che i mostri lo stiano già attaccando", 7000, true)
    pause(7000)
    otherSprite.sayText("Vai a prendere il cristallo di ghiaccio e poi vai nel portale a fermare l'Invasione!", 7000, true)
    pause(7000)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
function openinventory () {
    Inventarioaperto = true
    controller.moveSprite(mySprite, 0, 0)
    selectedIndex = 0
}
// Attacchi
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 1
    selectedIndex = Math.min(selectedIndex + 1, Tools.length - 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Guardia_Portale, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(2000)
})
// Cambio mondo
scene.onOverlapTile(SpriteKind.Player, assets.tile`Porta casa`, function (sprite, location) {
    if (zona_corrente == 0) {
        cambiaZona(1)
    } else if (zona_corrente == 1 || zona_corrente == 2) {
        cambiaZona(0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Contadino, function (sprite, otherSprite) {
    if (BANANNA == true) {
        otherSprite.sayText("Grazie mille amico", 3500, true)
        pause(3500)
    } else {
        if (progressoCittà == 0) {
            otherSprite.sayText("Ehi, la faresti una cosa per me?", 3500, true)
            pause(3500)
            otherSprite.sayText("Se mi aiuterai ti darò un casco di banane (anche se non è molto)", 6500, true)
            pause(6500)
            otherSprite.sayText("Premi \"A\" per accettare, premi \"B\" per rifiutare (NON cliccare tante volte)", 6500, true)
            Contadino_dialogo2 = true
            if (Contadinodialogo1) {
                otherSprite.sayText("Fa un caldo di questi giorni, se potessi rinfrescarmi un po' te ne sarei grato", 7000, true)
                pause(7000)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tel mappa centrale`, function (sprite, location) {
    cambiaZona(3)
    if (Narratore_5_spawn) {
        Narratore_5_ = sprites.create(assets.image`narratore`, SpriteKind.Narratore_5)
        Narratore_5_.setPosition(mySprite.x + 10, mySprite.y + 10)
        Narratore_5_spawn = false
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 4
})
// Combattimento
sprites.onOverlap(SpriteKind.Player, SpriteKind.CristalloGhiaccio, function (sprite, otherSprite) {
    ghiaccio = true
    Tools[3] = assets.image`Attacco di ghiaccio`
    Tools_names[3] = "Cristallo ghiaccio"
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    cambiaZona(2)
})
scene.onOverlapTile(SpriteKind.Personaggio2, assets.tile`Arrivo personaggio2`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`tileMapTrieste`)
    tiles.placeOnRandomTile(mySprite, assets.tile`Spawn aiutante quest`)
    tiles.placeOnRandomTile(sprite, assets.tile`Spawn aiutante quest`)
    Vittoria = true
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inventarioaperto) {
        closeinventory()
    } else {
        openinventory()
    }
})
info.onLifeZero(function () {
    if (zona_corrente == 4) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        mySprite.setPosition(32 * 16, 32 * 16)
        Narratore_4_ = sprites.create(assets.image`narratore`, SpriteKind.Narratore_4)
        Narratore_4_.setPosition(31 * 16, 31 * 16)
        info.setLife(10)
        sprites.destroyAllSpritesOfKind(SpriteKind.Guardia_Portale)
        Nemici = []
    } else {
        game.setGameOverMessage(false, "GAME OVER!")
        game.gameOver(false)
    }
})
// Inventario
spriteutils.createRenderable(100, function (screen2) {
    if (Inventarioaperto) {
        screen2.fillRect(10, 10, 170, 100, 4)
        screen2.drawRect(10, 10, 170, 100, 14)
        screen2.print("INVENTARIO", 14, 14, 15)
screen2.print(Tools_names[selectedIndex], 80, 14, 0)
screen2.fillRect(14, 24, 162, 1, 15)
        tool_top = 28
        for (let index = 0; index <= Tools.length - 1; index++) {
            spriteutils.drawTransparentImage(Tools[index], screen2, 14 + index * 20, tool_top)
        }
        spriteutils.drawTransparentImage(img`
            11.11.11.11.11.11.11
            1...................
            ...................1
            1..................1
            1...................
            ...................1
            1..................1
            1...................
            ...................1
            1..................1
            1...................
            ...................1
            1..................1
            1...................
            ...................1
            1..................1
            1...................
            ...................1
            1..................1
            1.11.11.11.11.11.11.
            `, screen2, 14 + selectedIndex * 20 - 2, tool_top - 2)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Guardia_Portale, function (sprite, otherSprite) {
    if (sprite == AttaccoGhiaccio) {
        if (randint(1, 6) >= 3) {
            sprites.destroy(otherSprite, effects.disintegrate, 500)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        }
    } else {
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    }
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Tel da castello a mappa generale`, function (sprite, location) {
    cambiaZona(8)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`da strada nord a città`, function (sprite, location) {
    cambiaZona(6)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Nemico_potenziato, function (sprite, otherSprite) {
    if (sprite == Attaccofuoco) {
        VitaNemicoPotenziato += -1
        if (VitaNemicoPotenziato <= 0) {
            sprites.destroy(otherSprite, effects.ashes, 500)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            sprites.destroy(Narratore_3_)
        }
    } else {
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    }
    sprites.destroy(sprite)
})
// Game Over
sprites.onOverlap(SpriteKind.Nemico_potenziato, SpriteKind.blocco, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Il cristallo è stato rubato!")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    cambiaZona(6)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`strada settentrionale`, function (sprite, location) {
    cambiaZona(9)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Nemici.removeAt(Nemici.indexOf(sprite))
    if (Nemici.length == 0) {
        if (zona_corrente == 1 && zone1_spawn_cpt == 6) {
            effects.blizzard.startScreenEffect(2000)
            tiles.setCurrentTilemap(tilemap`Villaggio`)
            z1_ripulita = true
            Narratore_2 = sprites.create(assets.image`narratore`, SpriteKind.Narratore2)
            Narratore_2.setPosition(mySprite.x - 16, mySprite.y - 17)
            info.changeLifeBy(3)
        } else if (zona_corrente == 5 && zona5_spawn_cpt == 8) {
            mySprite.sayText("Una porta si è aperta in questa area!", 5000, true)
            tiles.setTileAt(tiles.getTileLocation(25, 3), assets.tile`Portaaperta`)
            tiles.setWallAt(tiles.getTileLocation(25, 3), false)
            Narratore_3_ = sprites.create(assets.image`narratore`, SpriteKind.Narratore_3)
            Narratore_3_.setPosition(27 * 16, 3 * 16)
        }
    }
})
// Cambio Zona
function cambiaZona (zona: number) {
    sprites.destroy(mySprite)
    sprites.destroy(Narratore)
    sprites.destroy(Narratore_2)
    sprites.destroyAllSpritesOfKind(SpriteKind.Guardia_Portale)
    sprites.destroy(Narratore_3_)
    sprites.destroy(Narratore_4_)
    sprites.destroy(Narratore_5_)
    sprites.destroy(Contadino)
    mySprite = sprites.create(assets.image`Eroe`, SpriteKind.Player)
    // scene.setBackgroundImage()
    // spriteutils.moveTo(mySprite, spriteutils.pos(32 * 16, 32 * 16), 100, true)
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 100)
    if (zona == 0) {
        tiles.setCurrentTilemap(tilemap`casa iniziale`)
        tiles.placeOnRandomTile(mySprite, assets.tile`letto 1`)
        mySprite.y += 32
        if (z1_ripulita == true) {
            sprites.destroy(Narratore)
        } else {
            Narratore = sprites.create(assets.image`narratore`, SpriteKind.Narratore1)
            Narratore.setPosition(8 * 16, 18 * 16)
        }
    } else if (zona == 1) {
        if (z1_ripulita == true) {
            tiles.setCurrentTilemap(tilemap`Villaggio`)
            Contadino = sprites.create(assets.image`Contadino`, SpriteKind.Contadino)
            mySprite.setPosition(5 * 16, 8 * 16)
        } else {
            tiles.setCurrentTilemap(tilemap`Villaggio distrutto`)
        }
        tiles.placeOnRandomTile(mySprite, assets.tile`Porta casa`)
        mySprite.y += 16
        Sferafuoco = sprites.create(assets.image`trasparente`, SpriteKind.blocco)
        Sferafuoco.setPosition(21 * 16, 5 * 16)
    } else if (zona == 2) {
        tiles.setCurrentTilemap(tilemap`Villaggio`)
        Contadino = sprites.create(assets.image`Contadino`, SpriteKind.Contadino)
        Contadino.setPosition(5 * 16, 8 * 16)
        tiles.placeOnRandomTile(mySprite, assets.tile`Ghiaccio_3`)
        mySprite.y += -32
        tiles.setTileAt(tiles.getTileLocation(38, 29), sprites.castle.tilePath5)
        tiles.setTileAt(tiles.getTileLocation(39, 28), sprites.castle.tilePath5)
        tiles.setTileAt(tiles.getTileLocation(39, 29), assets.tile`tel mappa centrale`)
        if (fuoco == true) {
            tiles.setTileAt(tiles.getTileLocation(21, 3), sprites.castle.tileGrass1)
        }
    } else if (zona == 3) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        if (zona_corrente == 7) {
            tiles.placeOnRandomTile(mySprite, assets.tile`Blocco teletrasporto portale`)
        } else {
            tiles.placeOnRandomTile(mySprite, assets.tile`myTile2`)
        }
        mySprite.y += 32
    } else if (zona == 4) {
        tiles.setCurrentTilemap(tilemap`Tilemap morte`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile35`)
    } else if (zona == 5) {
        tiles.setCurrentTilemap(tilemap`Castello`)
        tiles.placeOnRandomTile(mySprite, assets.tile`Tel da castello a mappa generale`)
        mySprite.y += -32
    } else if (zona == 6) {
        tiles.setCurrentTilemap(tilemap`tileMapTrieste`)
        scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`trieste`)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections, scroller.BackgroundLayer.Layer0)
        mySprite.x = 144
        mySprite.y = 336
        spriteCittà()
    } else if (zona == 7) {
        tiles.setCurrentTilemap(tilemap`Bossfight portale`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile35`)
    } else if (zona == 8) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        tiles.placeOnRandomTile(mySprite, sprites.dungeon.collectibleInsignia)
        mySprite.y += 32
    } else if (zona == 9) {
        tiles.setCurrentTilemap(tilemap`Strada settentrionale`)
        tiles.placeOnRandomTile(mySprite, assets.tile`da strada nord a città`)
        mySprite.y += -32
        sprites.destroy(ReginaCittà)
        sprites.destroy(PersonaggioCittà1)
        sprites.destroy(PersonaggioCittà2)
        if (AIutantequest) {
            PersonaggioCittà2 = sprites.create(assets.image`personaggio2`, SpriteKind.Personaggio2)
            PersonaggioCittà2.follow(mySprite, 45)
            tiles.placeOnRandomTile(PersonaggioCittà2, assets.tile`strada settentrionale`)
        }
    }
    zona_corrente = zona
    direzionecolpo = 0
    Nemici = []
}
// Combattimento
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cristallofuoco, function (sprite, otherSprite) {
    fuoco = true
    tiles.setTileAt(tiles.getTileLocation(21, 3), sprites.castle.tileGrass1)
    Tools[2] = assets.image`Attacco di fuoco`
    Tools_names[2] = "Cristallo fuoco"
})
sprites.onDestroyed(SpriteKind.Nemico_potenziato, function (sprite) {
    Sferadaprendere = sprites.create(assets.image`Attacco di ghiaccio`, SpriteKind.CristalloGhiaccio)
    Sferadaprendere.x = sprite.x
    Sferadaprendere.y = sprite.y
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.trail, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    cambiaZona(5)
})
// Attacchi
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(1000)
})
let zona9_spawn_cpt = 0
let zona7_spawn_cpt = 0
let zona4_spawn_cpt = 0
let Sferafuoco: Sprite = null
let Narratore: Sprite = null
let Narratore_2: Sprite = null
let zona5_spawn_cpt = 0
let zone1_spawn_cpt = 0
let Narratore_3_: Sprite = null
let Narratore_5_: Sprite = null
let Narratore_4_: Sprite = null
let Inventarioaperto = false
let projectile: Sprite = null
let Contadinodialogo1 = false
let Sferadaprendere: Sprite = null
let Perso_personaggio2 = false
let AttaccoGhiaccio: Sprite = null
let vy = 0
let vx = 0
let Contadino: Sprite = null
let zona_corrente = 0
let Contadino_dialogo2 = false
let VitaNemicoPotenziato = 0
let Uscita: Sprite = null
let Nemico_potenziato_: Sprite = null
let ReginaCittà: Sprite = null
let AIutantequest = false
let PersonaggioCittà2: Sprite = null
let PersonaggioCittà1: Sprite = null
let direzionecolpo = 0
let BANANNA = false
let Attaccofuoco: Sprite = null
let Nemici: Sprite[] = []
let mySprite: Sprite = null
let Vittoria = false
let Vita_personaggio2 = 0
let progressoCittà = 0
let z1_ripulita = false
let ghiaccio = false
let fuoco = false
let Narratore_5_spawn = false
let CIttàaperta = false
let Aiutanteregina = false
CIttàaperta = false
Narratore_5_spawn = true
fuoco = false
ghiaccio = true
z1_ripulita = false
progressoCittà = 0
Vita_personaggio2 = 15
Vittoria = false
let tool_top = 0
let selectedIndex = 0
let Tools_names: string[] = []
let Tools: Image[] = []
scene.setBackgroundImage(assets.image`Copertina`)
music.play(music.createSong(assets.song`Invasion_music`), music.PlaybackMode.InBackground)
pause(5000)
pauseUntil(() => controller.A.isPressed())
mySprite = sprites.create(assets.image`Eroe`, SpriteKind.Player)
Nemici = []
scene.setBackgroundImage(assets.image`Inizio`)
let mySprite2 = sprites.create(assets.image`tutto_nero`, SpriteKind.Player)
mySprite2.sayText("... Cos'è questa puzza di fumo?", 4000, true)
pause(4000)
sprites.destroy(mySprite2)
let sword2 = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . b c 
    . . . . . . . . . . . . . b e . 
    . . . . . . . . . d d . b e . . 
    . . . . . . . . . . d b b . . . 
    . . . . . . . . . . d b b . . . 
    . . . . . . . . . d b b . b . . 
    . . . . . . . . d e b . . b . . 
    . . . . . . . d e b . . . . . . 
    . . . . . . d e b . . . . . . . 
    . . . . . d e b . . . . . . . . 
    . . . . d e b . . . . . . . . . 
    . . . d e b . . . . . . . . . . 
    . . d e b . . . . . . . . . . . 
    . d b b . . . . . . . . . . . . 
    . d d . . . . . . . . . . . . . 
    `
info.setLife(10)
Tools = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . b c 
    . . . . . . . . . . . . . b e . 
    . . . . . . . . . d d . b e . . 
    . . . . . . . . . . d b b . . . 
    . . . . . . . . . . d b b . . . 
    . . . . . . . . . d e b . b . . 
    . . . . . . . . d e b . . b . . 
    . . . . . . . d e b . . . . . . 
    . . . . . . d e b . . . . . . . 
    . . . . . d e b . . . . . . . . 
    . . . . d e b . . . . . . . . . 
    . . . d e b . . . . . . . . . . 
    . . d e b . . . . . . . . . . . 
    . d b b . . . . . . . . . . . . 
    . d d . . . . . . . . . . . . . 
    `,
assets.image`Scudo fab`,
assets.image`q`,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
assets.image`sferadaprendere`
]
Tools_names = [
"Spada",
"Scudo Fab",
"",
"",
""
]
Nemici = []
cambiaZona(0)
// Game over
game.onUpdateInterval(4000, function () {
    if (zona_corrente == 1 && zone1_spawn_cpt < 6) {
        Nemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        if (randint(0, 10) < 6) {
            Nemici[0].follow(Sferafuoco, 20)
        } else {
            Nemici[0].follow(mySprite, 20)
        }
        tiles.placeOnRandomTile(Nemici[0], assets.tile`Spawner nemici normali`)
        zone1_spawn_cpt += 1
    } else if (zona_corrente == 5 && zona5_spawn_cpt < 8) {
        Nemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        Nemici[0].follow(mySprite, 20)
        tiles.placeOnRandomTile(Nemici[0], assets.tile`Spawner nemici normali`)
        zona5_spawn_cpt += 1
    } else if (zona_corrente == 4 && zona4_spawn_cpt < 6) {
        Nemici[0] = sprites.create(assets.image`Miniboss in portale`, SpriteKind.Guardia_Portale)
        tiles.placeOnRandomTile(Nemici[0], assets.tile`Spawn guardie portale`)
        Nemici[0].follow(mySprite, 65)
        zona4_spawn_cpt += 1
    } else if (zona_corrente == 7 && zona7_spawn_cpt < 9) {
        Nemici[0] = sprites.create(assets.image`Miniboss in portale`, SpriteKind.Guardia_Portale)
        tiles.placeOnRandomTile(Nemici[0], assets.tile`Spawn guardie portale`)
        Nemici[0].follow(mySprite, 40)
        zona7_spawn_cpt += 1
    } else if (zona_corrente == 9 && zona9_spawn_cpt < 15 && AIutantequest) {
        Nemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        Nemici[0].follow(PersonaggioCittà2, 30)
        tiles.placeOnRandomTile(Nemici[0], assets.tile`Spawner nemici normali`)
        zona9_spawn_cpt += 1
    }
    if (ghiaccio) {
        tiles.setWallAt(tiles.getTileLocation(32, 38), false)
        tiles.setWallAt(tiles.getTileLocation(33, 38), false)
    }
    if (CIttàaperta) {
        tiles.setWallAt(tiles.getTileLocation(38, 32), false)
        tiles.setWallAt(tiles.getTileLocation(38, 33), false)
    }
})
