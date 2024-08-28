namespace SpriteKind {
    export const NemicoPotenziato = SpriteKind.create()
    export const GuardiaPortale = SpriteKind.create()
    export const BossFinale = SpriteKind.create()
    export const Blocco = SpriteKind.create()
    export const Narratore1 = SpriteKind.create()
    export const Narratore2 = SpriteKind.create()
    export const Cristallofuoco = SpriteKind.create()
    export const Attacco_sfera_fuoco = SpriteKind.create()
    export const CristalloGhiaccio = SpriteKind.create()
    export const Narratore3 = SpriteKind.create()
    export const Attacco_sfera_ghiaccio = SpriteKind.create()
    export const Narratore4 = SpriteKind.create()
    export const Narratore5 = SpriteKind.create()
    export const Personaggio1 = SpriteKind.create()
    export const Personaggio2 = SpriteKind.create()
    export const Regina = SpriteKind.create()
    export const Contadino = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.NemicoPotenziato, function (sprite, otherSprite) {
    if (sprite == attaccoFuoco) {
        vitaNemicoPotenziato += -1
        if (vitaNemicoPotenziato <= 0) {
            sprites.destroy(otherSprite, effects.ashes, 500)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            sprites.destroy(narratore_3)
        }
    } else {
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    }
    sprites.destroy(sprite)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Regina, function (sprite, otherSprite) {
    if (progressoCittà == 2) {
        if (true) {
            otherSprite.sayText("Risolvi l'enigma", 7000, true)
        } else {
            otherSprite.sayText("Ecco a te la bacchetta 🪄", 7000, true)
            progressoCittà += 1
        }
    } else {
        otherSprite.sayText("Sparisci della mia vista, plebeo!", 5000, true)
    }
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Ghiaccio_3`, function (sprite, location) {
    if (sprite == attaccoFuoco) {
        tiles.setTileAt(location, assets.tile`tel mappa centrale`)
    }
    sprites.destroy(sprite)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Personaggio1, function (sprite, otherSprite) {
    if (progressoCittà == 0) {
        if (BANANNA == false) {
            story.spriteSayText(otherSprite, "Portami una banana!", 15)
        } else if (BANANNA == true) {
            story.spriteSayText(otherSprite, "Grazie per la banana!", 15)
            progressoCittà = 1
        }
    } else {
        story.spriteSayText(otherSprite, "Gnam", 15, 1, story.TextSpeed.VeryFast)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        direzioneColpo = 3
    }
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore5, function (sprite, otherSprite) {
    game.showLongText("Il tuo prossimo obiettivo è il castello", DialogLayout.Bottom)
    game.showLongText("Sembra che i mostri lo stiano già attaccando", DialogLayout.Bottom)
    game.showLongText("Vai a prendere il cristallo di ghiaccio e poi vai nel portale a fermare l'Invasione!", DialogLayout.Bottom)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
sprites.onDestroyed(SpriteKind.NemicoPotenziato, function (sprite) {
    sferaDaPrendere = sprites.create(assets.image`Attacco di ghiaccio`, SpriteKind.CristalloGhiaccio)
    sferaDaPrendere.x = sprite.x
    sferaDaPrendere.y = sprite.y
})
function spriteCittà () {
    p1 = sprites.create(assets.image`scimmia`, SpriteKind.Personaggio1)
    tiles.placeOnRandomTile(p1, assets.tile`spawnPersonaggio`)
    p2 = sprites.create(assets.image`personaggio2`, SpriteKind.Personaggio2)
    if (p2Quest) {
        tiles.placeOnRandomTile(p2, assets.tile`Spawn aiutante quest`)
    } else {
        tiles.placeOnRandomTile(p2, assets.tile`spawnPersonaggio`)
        p2.y += -16
    }
    reginaCittà = sprites.create(assets.image`regina`, SpriteKind.Regina)
    tiles.placeOnRandomTile(reginaCittà, assets.tile`spawnPersonaggio`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Portaaperta`, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.floorLight2)
    nemicoPotenziato = sprites.create(assets.image`Nemico potenziato`, SpriteKind.NemicoPotenziato)
    nemicoPotenziato.setPosition(21 * 16, 4 * 16)
    p2QuestUscita = sprites.create(assets.image`asddassad`, SpriteKind.Blocco)
    p2QuestUscita.setPosition(20 * 16, 37 * 16)
    nemicoPotenziato.follow(p2QuestUscita, 20)
    vitaNemicoPotenziato = 5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        if (direzioneColpo == 1) {
            vx = 110
            vy = 0
        } else if (direzioneColpo == 2) {
            vx = -110
            vy = 0
        } else if (direzioneColpo == 4) {
            vx = 0
            vy = 110
        } else if (direzioneColpo == 3) {
            vx = 0
            vy = -110
        }
        if (ghiaccio) {
            attaccoGhiaccio = sprites.createProjectileFromSprite(assets.image`Attacco di ghiaccio`, eroe, vx, vy)
            pause(1000)
            sprites.destroy(attaccoGhiaccio)
            pause(1000)
        } else if (fuoco) {
            attaccoFuoco = sprites.createProjectileFromSprite(assets.image`Attacco di fuoco`, eroe, vx, vy)
            pause(1000)
            sprites.destroy(attaccoFuoco)
            pause(1000)
        }
    }
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Personaggio2, function (sprite, otherSprite) {
    if (progressoCittà == 0) {
        otherSprite.sayText("Dov'è la mia scimmia?...", 2000, true)
        pause(2000)
    }
    if (progressoCittà == 1) {
        if (p2QuestFallita) {
            otherSprite.sayText("Dobbiamo riprovarci! Se vuoi la bacchetta devi scortarmi fino a lì!", 7000, true)
        } else if (p2QuestVittoria == true) {
            otherSprite.sayText("Grazie mille per l'aiuto!", 4000, true)
            pause(4000)
            otherSprite.sayText("Parlerò bene di te alla regina!", 4000, true)
            pause(4000)
            p2Quest = false
            progressoCittà = 2
        }
        if (p2Quest) {
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
            p2Quest = true
        }
    } else if (progressoCittà == 2) {
        otherSprite.sayText("Grazie mille per l'aiuto", 4000, true)
    }
})
scene.onHitWall(SpriteKind.NemicoPotenziato, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, assets.tile`muro distrutto`)
})
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore2, function (sprite, otherSprite) {
    sferaDaPrendere = sprites.create(assets.image`sferadaprendere`, SpriteKind.Cristallofuoco)
    sferaDaPrendere.setPosition(21 * 16, 5 * 16)
    game.showLongText("Grazie mille per aver protetto il villaggio!", DialogLayout.Bottom)
    game.showLongText("In tutto il mondo, i mostri stanno cercando di rubare i cristalli ", DialogLayout.Bottom)
    game.showLongText("I cristalli sono 3: il cristallo di fuoco, quello che abbiamo protetto oggi,", DialogLayout.Bottom)
    game.showLongText("il cristallo di ghiaccio, custodito al castello,", DialogLayout.Bottom)
    game.showLongText("e, infine, il cristallo dei fulmini, che i mostri hanno già rubato", DialogLayout.Bottom)
    game.showLongText("Le tue sole forze non basteranno per contrastare l'invasione", DialogLayout.Bottom)
    game.showLongText("Prendi il cristallo di fuoco, e usa i suoi poteri per uscire di qui!", DialogLayout.Bottom)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Contadino, function (sprite, otherSprite) {
    if (sprite == attaccoGhiaccio) {
        if (contadinoDialogo1 && !(BANANNA)) {
            sprites.destroy(sprite, effects.spray, 500)
            story.spriteSayText(otherSprite, "Ah, ci voleva proprio una bella rinfrescata", 15, 1, story.TextSpeed.Normal)
            story.spriteSayText(otherSprite, "Ecco a te le banane, come promesso!", 15, 1, story.TextSpeed.Normal)
            BANANNA = true
        } else {
            story.spriteSayText(otherSprite, "Ah, ci voleva proprio una bella rinfrescata", 15, 1, story.TextSpeed.Normal)
            story.spriteSayText(otherSprite, "Prendi delle banane, come ringraziamento", 15, 1, story.TextSpeed.Normal)
            BANANNA = true
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        if (direzioneColpo == 1) {
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
                `, eroe, 100, 0)
            pause(100)
            sprites.destroy(projectile)
            animation.runImageAnimation(
            eroe,
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
        } else if (direzioneColpo == 2) {
            projectile = sprites.createProjectileFromSprite(assets.image`myImage`, eroe, -100, 0)
            pause(150)
            sprites.destroy(projectile)
            animation.runImageAnimation(
            eroe,
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
        } else if (direzioneColpo == 4) {
            projectile = sprites.createProjectileFromSprite(assets.image`attacco inbasso`, eroe, 0, 100)
            pause(100)
            sprites.destroy(projectile)
            animation.runImageAnimation(
            eroe,
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
    }
})
// Game Over
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Blocco, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Il cristallo è stato rubato!")
    game.gameOver(false)
})
function closeinventory () {
    inventarioAperto = false
    controller.moveSprite(eroe)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.GuardiaPortale, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(2000)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Personaggio2, function (sprite, otherSprite) {
    p2Vita += -1
    pause(2000)
    if (p2Vita == 0) {
        tiles.setCurrentTilemap(tilemap`tileMapTrieste`)
        tiles.placeOnRandomTile(eroe, assets.tile`Spawn aiutante quest`)
        tiles.placeOnRandomTile(otherSprite, assets.tile`Spawn aiutante quest`)
        p2QuestFallita = true
        p2Vita = 15
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direzioneColpo = 2
    selectedIndex = Math.max(selectedIndex - 1, 0)
})
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Ghiaccio_1`, function (sprite, location) {
    if (sprite == attaccoFuoco) {
        tiles.setTileAt(location, sprites.castle.tilePath5)
    }
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Blocco teletrasporto portale`, function (sprite, location) {
    if (zonaCorrente == 7) {
        cambiaZona(3)
    } else {
        cambiaZona(7)
    }
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore1, function (sprite, otherSprite) {
    game.showLongText("I mostri ci stanno attaccando! Proteggi il cristallo, presto!", DialogLayout.Top)
    game.showLongText("Per attaccare premi \"A\" muovendoti nella direzione nella quale vuoi che vada il colpo", DialogLayout.Top)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Teletrasporto per morte`, function (sprite, location) {
    if (zonaCorrente == 4) {
        cambiaZona(3)
    } else {
        cambiaZona(4)
    }
})
function openinventory () {
    inventarioAperto = true
    controller.moveSprite(eroe, 0, 0)
    selectedIndex = 0
}
// Villaggio
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore3, function (sprite, otherSprite) {
    game.showLongText("Attento! Il mostro sta scappando con il cristallo!", DialogLayout.Bottom)
    game.showLongText("Usa il fuoco per fargli del danno, è il suo punto debole!", DialogLayout.Bottom)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore4, function (sprite, otherSprite) {
    game.showLongText("Non sei ancora pronto per affrontare l'Invasione", DialogLayout.Bottom)
    game.showLongText("Nella città si dice che vi sia nascosta una bacchetta,", DialogLayout.Bottom)
    game.showLongText("Potrebbe canalizzare il potere del cristallo e renderti più potente!", DialogLayout.Bottom)
    game.showLongText("Cosa aspetti, presto,valla a cercare!", DialogLayout.Bottom)
    cittàAperta = true
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
// Attacchi
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direzioneColpo = 1
    selectedIndex = Math.min(selectedIndex + 1, arrTools.length - 1)
})
// Cambio mondo
scene.onOverlapTile(SpriteKind.Player, assets.tile`Porta casa`, function (sprite, location) {
    if (zonaCorrente == 0) {
        cambiaZona(1)
    } else if (zonaCorrente == 1 || zonaCorrente == 2) {
        cambiaZona(0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Contadino, function (sprite, otherSprite) {
    if (BANANNA) {
        story.spriteSayText(otherSprite, "Grazie mille amico", 15, 1, story.TextSpeed.Normal)
    } else {
        if (progressoCittà == 0) {
            if (!(contadinoDialogo1)) {
                story.spriteSayText(otherSprite, "Ehi, la faresti una cosa per me?", 15, 1, story.TextSpeed.Normal)
                story.spriteSayText(otherSprite, "Se mi aiuterai ti darò un casco di banane (anche se non è molto)")
                controller.moveSprite(sprite, 0, 0)
                story.showPlayerChoices("Accettare", "Rifiutare")
                controller.moveSprite(sprite, 100, 100)
                if (story.getLastAnswer() == "Accettare") {
                    story.spriteSayText(otherSprite, "Fa un caldo di questi giorni, se potessi rinfrescarmi un po' te ne sarei grato!")
                    contadinoDialogo1 = true
                } else {
                    story.spriteSayText(otherSprite, "Va bene, sarà per la prossima volta...")
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tel mappa centrale`, function (sprite, location) {
    cambiaZona(3)
    if (spawnNarratore5) {
        narratore_5 = sprites.create(assets.image`sptNarratore`, SpriteKind.Narratore5)
        narratore_5.setPosition(eroe.x + 10, eroe.y + 10)
        spawnNarratore5 = false
    }
})
// NEMICI
sprites.onOverlap(SpriteKind.Player, SpriteKind.BossFinale, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    pause(1000)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        direzioneColpo = 4
    }
})
// Combattimento
sprites.onOverlap(SpriteKind.Player, SpriteKind.CristalloGhiaccio, function (sprite, otherSprite) {
    ghiaccio = true
    arrTools[3] = assets.image`Attacco di ghiaccio`
    arrToolsNames[3] = "Cristallo ghiaccio"
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    cambiaZona(2)
})
// Cambio mondo
scene.onOverlapTile(SpriteKind.Player, assets.tile`Da città a mondo generale`, function (sprite, location) {
    cambiaZona(3)
})
scene.onOverlapTile(SpriteKind.Personaggio2, assets.tile`Arrivo personaggio2`, function (sprite, location) {
    effects.smiles.startScreenEffect(500)
    pause(500)
    p2QuestVittoria = true
    cambiaZona(5)
    tiles.placeOnRandomTile(eroe, assets.tile`Spawn aiutante quest`)
    tiles.placeOnRandomTile(p2, assets.tile`Spawn aiutante quest`)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventarioAperto) {
        closeinventory()
    } else {
        openinventory()
    }
})
info.onLifeZero(function () {
    if (zonaCorrente == 4) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        eroe.setPosition(32 * 16, 32 * 16)
        narratore_4 = sprites.create(assets.image`sptNarratore`, SpriteKind.Narratore4)
        narratore_4.setPosition(31 * 16, 31 * 16)
        info.setLife(10)
        sprites.destroyAllSpritesOfKind(SpriteKind.GuardiaPortale)
        arrNemici = []
    } else {
        game.setGameOverMessage(false, "GAME OVER!")
        game.gameOver(false)
    }
})
// Inventario
spriteutils.createRenderable(100, function (screen2) {
    if (inventarioAperto) {
        screen2.fillRect(10, 10, 170, 100, 4)
        screen2.drawRect(10, 10, 170, 100, 14)
        screen2.print("INVENTARIO", 14, 14, 15)
screen2.print(Tools_names[selectedIndex], 80, 14, 0)
screen2.fillRect(14, 24, 162, 1, 15)
        toolTop = 28
        for (let index = 0; index <= arrTools.length - 1; index++) {
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.GuardiaPortale, function (sprite, otherSprite) {
    if (sprite == attaccoGhiaccio) {
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.NemicoPotenziato, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    cambiaZona(6)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`strada settentrionale`, function (sprite, location) {
    cambiaZona(9)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    arrNemici.removeAt(arrNemici.indexOf(sprite))
    if (arrNemici.length == 0) {
        if (zonaCorrente == 1 && zone1SpawnCnt == 6) {
            effects.blizzard.startScreenEffect(2000)
            tiles.setCurrentTilemap(tilemap`Villaggio`)
            z1Ripulita = true
            narratore_2 = sprites.create(assets.image`sptNarratore`, SpriteKind.Narratore2)
            narratore_2.setPosition(eroe.x - 16, eroe.y - 17)
            info.changeLifeBy(3)
        } else if (zonaCorrente == 5 && zona5SpawnCnt == 8) {
            eroe.sayText("Una porta si è aperta in questa area!", 5000, true)
            tiles.setTileAt(tiles.getTileLocation(25, 3), assets.tile`Portaaperta`)
            tiles.setWallAt(tiles.getTileLocation(25, 3), false)
            narratore_3 = sprites.create(assets.image`sptNarratore`, SpriteKind.Narratore3)
            narratore_3.setPosition(27 * 16, 3 * 16)
        }
    }
})
// Cambio Zona
function cambiaZona (zona: number) {
    sprites.destroy(eroe)
    sprites.destroy(narratore_1)
    sprites.destroy(narratore_2)
    sprites.destroyAllSpritesOfKind(SpriteKind.GuardiaPortale)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    arrNemici = []
    sprites.destroy(narratore_3)
    sprites.destroy(narratore_4)
    sprites.destroy(narratore_5)
    sprites.destroy(contadino1)
    sprites.destroy(p1)
    sprites.destroy(p2)
    sprites.destroy(reginaCittà)
    eroe = sprites.create(assets.image`Eroe`, SpriteKind.Player)
    // scene.setBackgroundImage()
    // spriteutils.moveTo(mySprite, spriteutils.pos(32 * 16, 32 * 16), 100, true)
    scene.cameraFollowSprite(eroe)
    controller.moveSprite(eroe, 100, 100)
    if (zona == 0) {
        tiles.setCurrentTilemap(tilemap`casa iniziale`)
        tiles.placeOnRandomTile(eroe, assets.tile`letto 1`)
        eroe.y += 32
        if (z1Ripulita == false) {
            narratore_1 = sprites.create(assets.image`sptNarratore`, SpriteKind.Narratore1)
            narratore_1.setPosition(8 * 16, 18 * 16)
        }
    } else if (zona == 1) {
        if (z1Ripulita == true) {
            tiles.setCurrentTilemap(tilemap`Villaggio`)
            contadino1 = sprites.create(assets.image`Contadino`, SpriteKind.Contadino)
            eroe.setPosition(5 * 16, 8 * 16)
        } else {
            tiles.setCurrentTilemap(tilemap`Villaggio distrutto`)
        }
        tiles.placeOnRandomTile(eroe, assets.tile`Porta casa`)
        eroe.y += 16
        sferaFuoco = sprites.create(assets.image`trasparente`, SpriteKind.Blocco)
        sferaFuoco.setPosition(21 * 16, 5 * 16)
    } else if (zona == 2) {
        tiles.setCurrentTilemap(tilemap`Villaggio`)
        contadino1 = sprites.create(assets.image`Contadino`, SpriteKind.Contadino)
        contadino1.setPosition(5 * 16, 8 * 16)
        tiles.placeOnRandomTile(eroe, assets.tile`Ghiaccio_3`)
        eroe.y += -32
        tiles.setTileAt(tiles.getTileLocation(38, 29), sprites.castle.tilePath5)
        tiles.setTileAt(tiles.getTileLocation(39, 28), sprites.castle.tilePath5)
        tiles.setTileAt(tiles.getTileLocation(39, 29), assets.tile`tel mappa centrale`)
        if (fuoco == true) {
            tiles.setTileAt(tiles.getTileLocation(21, 3), sprites.castle.tileGrass1)
        }
    } else if (zona == 3) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        if (zonaCorrente == 7) {
            tiles.placeOnRandomTile(eroe, assets.tile`Blocco teletrasporto portale`)
        } else {
            tiles.placeOnRandomTile(eroe, assets.tile`myTile2`)
        }
        eroe.y += 32
    } else if (zona == 4) {
        tiles.setCurrentTilemap(tilemap`Tilemap morte`)
        tiles.placeOnRandomTile(eroe, assets.tile`myTile35`)
    } else if (zona == 5) {
        tiles.setCurrentTilemap(tilemap`Castello`)
        tiles.placeOnRandomTile(eroe, assets.tile`Tel da castello a mappa generale`)
        eroe.y += -32
    } else if (zona == 6) {
        tiles.setCurrentTilemap(tilemap`tileMapTrieste`)
        scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`trieste`)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections, scroller.BackgroundLayer.Layer0)
        eroe.x = 144
        eroe.y = 336
        spriteCittà()
    } else if (zona == 7) {
        tiles.setCurrentTilemap(tilemap`Bossfight portale`)
        tiles.placeOnRandomTile(eroe, assets.tile`myTile35`)
    } else if (zona == 8) {
        tiles.setCurrentTilemap(tilemap`Mappa generale`)
        tiles.placeOnRandomTile(eroe, sprites.dungeon.collectibleInsignia)
        eroe.y += 32
    } else if (zona == 9) {
        tiles.setCurrentTilemap(tilemap`Strada settentrionale`)
        tiles.placeOnRandomTile(eroe, assets.tile`da strada nord a città`)
        eroe.y += -32
        sprites.destroy(reginaCittà)
        sprites.destroy(p1)
        sprites.destroy(p2)
        if (p2Quest) {
            p2 = sprites.create(assets.image`personaggio2`, SpriteKind.Personaggio2)
            p2.follow(eroe, 45)
            tiles.placeOnRandomTile(p2, assets.tile`da strada nord a città`)
        }
    }
    zonaCorrente = zona
    direzioneColpo = 0
}
// Combattimento
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cristallofuoco, function (sprite, otherSprite) {
    fuoco = true
    tiles.setTileAt(tiles.getTileLocation(21, 3), sprites.castle.tileGrass1)
    arrTools[2] = assets.image`Attacco di fuoco`
    arrToolsNames[2] = "Cristallo fuoco"
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.trail, 500)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    cambiaZona(5)
})
// Game Over
sprites.onOverlap(SpriteKind.NemicoPotenziato, SpriteKind.Blocco, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Il cristallo è stato rubato!")
    game.gameOver(false)
})
// Attacchi
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(1000)
})
let zona9SpawnCnt = 0
let zona7SpawnCnt = 0
let zona4SpawnCnt = 0
let sferaFuoco: Sprite = null
let contadino1: Sprite = null
let narratore_1: Sprite = null
let narratore_2: Sprite = null
let zona5SpawnCnt = 0
let zone1SpawnCnt = 0
let toolTop = 0
let narratore_4: Sprite = null
let narratore_5: Sprite = null
let zonaCorrente = 0
let inventarioAperto = false
let projectile: Sprite = null
let contadinoDialogo1 = false
let p2QuestFallita = false
let attaccoGhiaccio: Sprite = null
let vy = 0
let vx = 0
let p2QuestUscita: Sprite = null
let nemicoPotenziato: Sprite = null
let reginaCittà: Sprite = null
let p2Quest = false
let p2: Sprite = null
let p1: Sprite = null
let sferaDaPrendere: Sprite = null
let direzioneColpo = 0
let BANANNA = false
let narratore_3: Sprite = null
let vitaNemicoPotenziato = 0
let attaccoFuoco: Sprite = null
let arrNemici: Sprite[] = []
let arrToolsNames: string[] = []
let arrTools: Image[] = []
let eroe: Sprite = null
let p2QuestVittoria = false
let p2Vita = 0
let progressoCittà = 0
let z1Ripulita = false
let ghiaccio = false
let fuoco = false
let spawnNarratore5 = false
let cittàAperta = false
let p2Regina = false
cittàAperta = false
spawnNarratore5 = true
fuoco = false
ghiaccio = false
z1Ripulita = false
progressoCittà = 0
p2Vita = 15
p2QuestVittoria = false
let tool_top = 0
let selectedIndex = 0
let Tools_names: string[] = []
let Tools: Image[] = []
scene.setBackgroundImage(assets.image`Copertina`)
music.play(music.createSong(assets.song`Invasion_music`), music.PlaybackMode.InBackground)
pause(5000)
pauseUntil(() => controller.A.isPressed())
eroe = sprites.create(assets.image`Eroe`, SpriteKind.Player)
scene.setBackgroundImage(assets.image`Inizio`)
game.showLongText("... Cos'è questa puzza di fumo?", DialogLayout.Center)
let spada = img`
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
arrTools = [
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
arrToolsNames = [
"Spada",
"Scudo Fab",
"",
"",
""
]
arrNemici = []
cambiaZona(0)
// Game over
game.onUpdateInterval(4000, function () {
    if (zonaCorrente == 1 && zone1SpawnCnt < 6) {
        arrNemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        if (randint(0, 10) < 6) {
            arrNemici[0].follow(sferaFuoco, 20)
        } else {
            arrNemici[0].follow(eroe, 20)
        }
        tiles.placeOnRandomTile(arrNemici[0], assets.tile`Spawner nemici normali`)
        zone1SpawnCnt += 1
    } else if (zonaCorrente == 5 && zona5SpawnCnt < 8) {
        arrNemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        arrNemici[0].follow(eroe, 20)
        tiles.placeOnRandomTile(arrNemici[0], assets.tile`Spawner nemici normali`)
        zona5SpawnCnt += 1
    } else if (zonaCorrente == 4 && zona4SpawnCnt < 6) {
        arrNemici[0] = sprites.create(assets.image`Miniboss in portale`, SpriteKind.GuardiaPortale)
        tiles.placeOnRandomTile(arrNemici[0], assets.tile`Spawn guardie portale`)
        arrNemici[0].follow(eroe, 65)
        zona4SpawnCnt += 1
    } else if (zonaCorrente == 7 && zona7SpawnCnt < 9) {
        arrNemici[0] = sprites.create(assets.image`Miniboss in portale`, SpriteKind.GuardiaPortale)
        tiles.placeOnRandomTile(arrNemici[0], assets.tile`Spawn guardie portale`)
        arrNemici[0].follow(eroe, 40)
        zona7SpawnCnt += 1
    } else if (zonaCorrente == 9 && zona9SpawnCnt < 15 && p2Quest) {
        arrNemici.unshift(sprites.create(assets.image`Nemico base`, SpriteKind.Enemy))
        arrNemici[0].follow(p2, 30)
        tiles.placeOnRandomTile(arrNemici[0], assets.tile`Spawner nemici normali`)
        zona9SpawnCnt += 1
    }
    if (ghiaccio) {
        tiles.setWallAt(tiles.getTileLocation(32, 38), false)
        tiles.setWallAt(tiles.getTileLocation(33, 38), false)
    }
    if (cittàAperta) {
        tiles.setWallAt(tiles.getTileLocation(38, 32), false)
        tiles.setWallAt(tiles.getTileLocation(38, 33), false)
    }
})
