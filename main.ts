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
}
scene.onHitWall(SpriteKind.Nemico_potenziato, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, sprites.dungeon.floorLight2)
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
scene.onOverlapTile(SpriteKind.Projectile, assets.tile`Ghiaccio_3`, function (sprite, location) {
    if (sprite == Attaccofuoco) {
        tiles.setTileAt(location, assets.tile`tel mappa centrale`)
    }
    sprites.destroy(sprite)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 3
})
// Game Over
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.blocco, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Il cristallo è stato rubato!")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Portaaperta`, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.floorLight2)
    Narratore_3 = sprites.create(assets.image`narratore`, SpriteKind.Narratore_3)
    Narratore_3.setPosition(24 * 16, 2 * 16)
    Nemico_potenziato_ = sprites.create(assets.image`Nemico potenziato`, SpriteKind.Nemico_potenziato)
    Nemico_potenziato_.setPosition(21 * 16, 4 * 16)
    Uscita = sprites.create(img`
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
        `, SpriteKind.blocco)
    Uscita.setPosition(20 * 16, 37 * 16)
    Nemico_potenziato_.follow(Uscita, 20)
    VitaNemicoPotenziato = 5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (direzionecolpo == 1) {
        vx = 100
        vy = 0
    } else if (direzionecolpo == 2) {
        vx = -100
        vy = 0
    } else if (direzionecolpo == 4) {
        vx = 0
        vy = 100
    } else if (direzionecolpo == 3) {
        vx = 0
        vy = -100
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
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
    cambiaZona(4)
})
// Narratore
sprites.onOverlap(SpriteKind.Player, SpriteKind.Narratore1, function (sprite, otherSprite) {
    Narratore.sayText("I mostri ci stanno attaccando! Proteggi il cristallo, presto!", 7000, true)
    pause(7000)
    Narratore.sayText("Per attaccare premi \"A\" muovendoti nella direzione nella quale vuoi che vada il colpo", 7000, true)
    pause(7000)
    sprites.destroy(otherSprite, effects.blizzard, 500)
})
function openinventory () {
    Inventarioaperto = true
    controller.moveSprite(mySprite, 0, 0)
    selectedIndex = 0
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direzionecolpo = 1
    selectedIndex = Math.min(selectedIndex + 1, Tools.length - 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Guardia_Portale, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    pause(1000)
})
// Cambio mondo
scene.onOverlapTile(SpriteKind.Player, assets.tile`Porta casa`, function (sprite, location) {
    if (zona_corrente == 0) {
        cambiaZona(1)
    } else if (zona_corrente == 1) {
        cambiaZona(0)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tel mappa centrale`, function (sprite, location) {
    cambiaZona(3)
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
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Inventarioaperto) {
        closeinventory()
    } else {
        openinventory()
    }
})
info.onLifeZero(function () {
    game.setGameOverMessage(false, "GAME OVER!")
    game.gameOver(false)
})
// Inventario
spriteutils.createRenderable(100, function (screen2) {
    if (Inventarioaperto) {
        screen2.fillRect(10, 10, 140, 100, 4)
        screen2.drawRect(10, 10, 140, 100, 14)
        screen2.print("INVENTARIO", 14, 14, 15)
screen2.print(Tools_names[selectedIndex], 80, 14, 0)
screen2.fillRect(14, 24, 132, 1, 15)
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Nemico_potenziato, function (sprite, otherSprite) {
    if (sprite == Attaccofuoco) {
        VitaNemicoPotenziato += -1
        if (VitaNemicoPotenziato <= 0) {
            sprites.destroy(otherSprite, effects.ashes, 500)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
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
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Nemici.removeAt(Nemici.indexOf(sprite))
    if (Nemici.length == 0) {
        if (zona_corrente == 1 && zone1_spawn_cpt == 6) {
            effects.blizzard.startScreenEffect(2000)
            tiles.setCurrentTilemap(tilemap`Villaggio`)
            z1_ripulita = true
            Narratore_2 = sprites.create(assets.image`narratore`, SpriteKind.Narratore2)
            Narratore_2.setPosition(mySprite.x - 16, mySprite.y - 16)
            info.changeLifeBy(3)
        } else if (zona_corrente == 5 && zona5_spawn_cpt == 8) {
            mySprite.sayText("Una porta si è aperta in questa area!", 5000, true)
            tiles.setTileAt(tiles.getTileLocation(25, 3), assets.tile`Portaaperta`)
            tiles.setWallAt(tiles.getTileLocation(25, 3), false)
        }
    }
})
// Cambio Zona
function cambiaZona (zona: number) {
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
        } else {
            tiles.setCurrentTilemap(tilemap`Villaggio distrutto`)
        }
        tiles.placeOnRandomTile(mySprite, assets.tile`Porta casa`)
        mySprite.y += 16
        Sferafuoco = sprites.create(img`
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
            `, SpriteKind.blocco)
        Sferafuoco.setPosition(21 * 16, 5 * 16)
    } else if (zona == 2) {
        tiles.setCurrentTilemap(tilemap`Villaggio`)
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
        sprites.destroy(Narratore)
        mySprite.setPosition(13 * 16, 17 * 16)
    } else if (zona == 4) {
        tiles.setCurrentTilemap(tilemap`Bossfight portale`)
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile35`)
    } else if (zona == 5) {
        tiles.setCurrentTilemap(tilemap`Castello`)
        tiles.placeOnRandomTile(mySprite, assets.tile`tel mappa centrale`)
        mySprite.y += -32
    } else if (zona == 6) {
        tiles.setCurrentTilemap(tilemap`Città`)
        mySprite.x = 19
        mySprite.y = 36
    }
    // scene.setBackgroundImage()
    // spriteutils.moveTo(mySprite, spriteutils.pos(32 * 16, 32 * 16), 100, true)
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 100)
    zona_corrente = zona
    direzionecolpo = 0
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
/**
 * Inizio gioco
 */
/**
 * Cambi ZONA
 */
/**
 * Attacchi
 */
/**
 * Inventario
 */
/**
 * Ritorno in mappa villaggio, togliere il ghiaccio
 */
let Sferafuoco: Sprite = null
let Narratore_2: Sprite = null
let zona5_spawn_cpt = 0
let zone1_spawn_cpt = 0
let zona_corrente = 0
let Narratore: Sprite = null
let Inventarioaperto = false
let projectile: Sprite = null
let Sferadaprendere: Sprite = null
let AttaccoGhiaccio: Sprite = null
let ghiaccio = false
let vy = 0
let vx = 0
let VitaNemicoPotenziato = 0
let Uscita: Sprite = null
let Nemico_potenziato_: Sprite = null
let Narratore_3: Sprite = null
let direzionecolpo = 0
let Attaccofuoco: Sprite = null
let z1_ripulita = false
let Nemici: Sprite[] = []
let mySprite: Sprite = null
let fuoco = false
let Tools: Image[] = []
let Tools_names: string[] = []
let selectedIndex = 0
let tool_top = 0
fuoco = false
scene.setBackgroundImage(img`
    bbbbbbbbb666666666666666666666bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb666bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddbbbbbbbbbbdbddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddbdbbbbbbddbbbbbbbbbbbbbbbbbbbbbbbbddddddddd
    bbbbb6b66666666666666666666666666bbbbbbbbbbbbbbbbbbbbbbbbbbb66666666bbbbbbbbbbbbbbbbbbbbbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddbdddbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddd
    bbbbb666666666666666666666666b6b6bbbbbbbbbbbbbbbbbbbbbbbbbb666666666666b6bbbbbbbbbbbbbbbbbbbbdddddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbddbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddd
    bb6bbbb6b6666666666666666666666b6bbbb666666bbbbbbbbb66b66bb66666666666666666b6bbbbbbbbbbbbbbbbddddddbbbb96666666bbbbbbbb6bbbbbbbbbbbbbb669999bbbddddddbbb9bbbbddbbbddbb99bb9bbbbbbbbbbbbddbbbbdddddddddd
    6bbbbbbbb6bb66666666666b6bb6666666bb66999996666bbbb69666666966966666666666966996bbbbb9999999dddddddbbb999999999666bbbbb699696bbbbbbbb99999669999dddddddb99999999bbbbbb9999999bbbbbbbdddddddddddddddddddd
    bbbbbbbbbb6bb6b6b666bbbbbb66996996666996669966666666966996696696666666666696696bbbbb96999999bddddbdbb99999966699996bbbb666969bbbbbb69699999999999dddddd999999969bbbbbb999999bbbdbddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbb666666b6669666966669666669666666669669966996996bb666666996696bbbbb999996699bbbbbbb9699996669696966bbb696699bbbbb9969999999bb9969ddddd9999999999bbbbbb999999ddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbb6b6666666669966966669666966966666669669666696696bbbb66669669966bb669966966966bbbbb69966999999999999bbb999699bbbbb96999996669999969dddd9999999999bdbdd9999999ddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbb666666666696669666696666669966666696699666969996bb6bbb6966966666669669966996bbbb6996699966669966999bb969999bdbd969b96999999999d969ddd99999699999dddd9999999ddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbb666666696669666696669966966666696699666999999bbb6669966966666669669996696bbbb69969966bbbb6996696bb999669bdb9999999bdddbd9999999dddd9999699969dddd9999999ddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbb6b66666966696666966699669966666966996bb999999dbbbb696699666666996696966966bb66996996bbbbbb99699bbb996699bbb9699999ddddddd9699999ddd99999999999ddd999999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbb666966696b6699669696669ddb696696bbb969969ddbb669669666bbb6996966966966bbb69966999bbbbbbbbbbbbb999999bb9999969ddddddddb99b969ddd99999999969dddd999999ddddddddddddddddddddddddddd
    bbbbbbbbbbb66b6bbbbbbbbbbbb6966696bb696669696699ddd999699bbb999999dddd6696696bbbb66966966996996bbb69969699996bbbbbbbbbb996999bb9999969bbddddddd969999ddd99999999999dddd99999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6996696bb6966696696669bdd99999bbbb99999dddd9696996bbbbb999999b996996bbbb6996999999999bbbbbbb999999bb9999999ddddddddd969999ddd999999999969ddd99999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6996996bb6996696666696bbd99699bbbb999969ddd966699bbbbb999999bb9999996bbbb99999999999999bbbbb969699bb9699999ddddddddd9699999d9999999999d99ddd99999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6966696bb69966966996699bb96699bbbb969b99ddd969999bbbbb999999bb9999999bbbbb99699999999999bbbb999999bb9699999ddddbbddd9999999dd99999dd999969dd99d99dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6996696bb6996696b696696bb96696bdbbb99b99ddd999999bbbb9999999bbb999969bbbbbb999999999999999bb9699699d9699999dbbdbdddd969999bdd99999dd969999dd99999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6996996bb6966996bb696696696699bbbdb99b96ddd699999bbbb99969969999699999bbbbbbb9999999999969bb999969dd9999999bdbdddddd9699999dd999999dd999969999d99dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6996696bb699699bbb696696696696bbbbb969999d999969bbbbb6666999999999d99bbbbbbbbbbb99996999999b969969bd9999999bdddddddb9699999d9999999dd999d99999d99dddddddddddddddddddddddddddd
    bbdddbbbbbbbbbbbbbbbbbbbbbb6996996bb999669bbbb69669696699bbbbbb99d99d99d999bbb669966999999b9dd96ddbbb99bbbbbbb99699969d969969bb9999969dbdddddb9999999ddd99999dddd99996999d99dddddddddddddddddddddddddddd
    bbdbbbbbbbbbbbbbbbbbbbbbbbb6996996bb6996696bbb96669699666bbbbbb99d999999996bbbb99969999999999d969d999999bbbbbbb9999969d969999bbb999999bbbbbbbdb999969ddd99999dddd969d9999d99dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbb996996bb699669bbbbb6966996699bbbbbb96999999969bbbb6696999999999969d9999999699bbbbbb9999969b969969bbb969b999bbbbbbb9666996bbb99b999dddd9999999d99ddddddddddddddddddddddddddbd
    bbbbbbbbddddbbbbbbbbbbbbbbbb996999bb699699bbbbb9666996696bbbbbbb99d999d969bbbb6999669bbbbbbd99d99996999699b9b99969b999b969969bbbb9999999bbbbb6696969bbbb99b99bdddd9699969d99dddddddddddddddddddddddddddd
    bbbbbbbbbdddbbbbbbbbbbbbbbb696699ddb699669bbbdbb9666666966bbbbbd99d969d999bbbb9999996bbbbbbb9699699999996999999699999bb969969bbbb969b99699999699b99bbddd99d99dddddd999969999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbb99b99ddb699699bbbbdb9696966666bbbbdd969d99d69ddbbb996999bbbbbbbb969d99d9999999999999b9999bb969999bbbbb969999999999bb969ddddd99d99dddddd969b99b99dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbb99b99dbb699669bbbbbdd99b966966bbbbbdb69ddd96ddbbbb999669bbbbbbbbb99d99dd9999b9b9999b9999ddd969969bbbbbb96999bb9bbb9969dddddd999999dddddd999bbb99dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbb99b99bbb699699bbbbbbb969999666bbbbbbb9699969dddbb9999996bbbbbbbbb96b969bb99699999999699dddd969969ddddddb9969999999699ddddddd99b96bbdbddb96999969dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbb99b99dbb696666bbbbbbdd9999996bbbbbbbb9999999dddbb999b666bbbbbbbbd99bb99dddd99999999999ddddd999999dddddddd9999999999bbddddddb99b99bbdddddb9999999dddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbddddddddddd9999bdddddddddddddddddddddddbbbb9bbbbbbbbbbbddbbdbbddddddddddddddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbdddddddddddbdddbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbddddddddbbbbbbbbbbbbbbbbbbddddddddddbbbbbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddbbddddbbbbbbbbbbbbbbbbdddddddddddddddbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    c6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbb6bbbbbbbbbbbbbbbbbbbbbbdddbdbbbdddbbbbbbbbbbbbbbbbddddddddddddddbdddbdbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    c666c66bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    c66666666666bbbbbbbbbbbbbbbbbbbbbbbbddbbbbbbbb6bbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddbbbbbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    666666666666666bbbddddbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddbbbbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    666666666666c66666bbbbdddddddddddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    666666666666666666666bbbbddddddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbbbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    6666666666666666666666666bbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddbbbbbbbbbbdddbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    6666666666666666666666666666b6bbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddbbbbbbbbbbbbdbbdddddddddddddddbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    6666666666666b66666666666666b66b6b6bbbbbbbbdd9dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    666666666666666b6666666666666666666b66b6b66bbbbbbd9dbbbbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1111111111111
    666666666666666bbbb6666666666666b6b66b66b6b66bbbbbbbbbbbbbbbbbbdbdbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbccccbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1d1d11111111111111111
    666666666666666bbbbbbb6666666666666b6666b6bbb6bbbb66b6b6b6666bbbbddddddddddddddddddddddddddddddddbccccbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1dd1d1111111111111111dd
    666666666666666666bbbbbb66666666666b6b6b66b6b6bbb6bb6b6b6bbbbbb6bbbbbbbbdddddddddddddddddddddddddbccccbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1dd1ddd1dd1d1d11d1d111111111111dd99
    666666666666666666bb6bbbbbbbb6b66b66b6666b66bbb6bbb6bbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddddddbccccccdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd1dd11d11d1111111111111111111111dd9999
    b6bb6b66666666666bbbbbbbbbbbbbbbbbbbbbbb6b6b6b66666bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddddddddbccccccbdddddddddddddddddddddddddddddddddddddddddddddddd1d1111d111dd11111d1111111111111111ddddddd9999999
    bb6bbbbbb6666b6b6bbb6bbbbbbbbbbbbbbbbbbbbbbb6bbbbbb6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb9b999d999bccc6ccccdddddddddddddddddddddddddddddddddddddddddd1d1d1dd1d1d11111dd111111d111111111111dd999999999999999
    bbbb6bbbbb6b6b6bbb666666bb6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb99999999dbccccccccbdddddddddddddddddddddddddddddddddddddddd1dddddd1dd1d11d11dd1111111111111111ddd99999999999999999
    bbbbbbbbbbbbbb666b66bbb6bb6b6666666bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb999999b9999999996ccc6cccc699d999d9dd99ddddddddddddddddddddddddddddd1dd1dddddd1d1dd1dd111111111dddddd999999999999999999999
    bbbbbbbbbbbbbbbbbbbbbbbbbbb6b666b6bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb99999999999999999bccccccccccb99d999999999d9dd999dddddddddddddddddddddddddd1d1d1d1d1d1db11ddddddd999999999999999999999999999
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb9bb9b9b9999999999999999999dd9d9999bccccccccccb99999999dd9dd9ddd9d9ddddd9d9d999dd99dddddd9ddddddddddddd66ddd999999999999999999999999999999999
    66bbbbbb9b9b9b9b9bbbbbbb9bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb9999999999999999999999d99999999999bcccccccccfb9d9999d9d9dd99dd9d9d99ddddd9ddddd99ddd9dddd999dd9ddd99ddbb999999999999999999999999999999999999
    b6bbb6bbbbbb9b99999999999999999999b9bb99999999999b999999999b999999999999d999d99d999d999999999dbccccccccccb99d99dddd1d11d11111d111d1d1dd1dddd1dd1d191ddd9ddd1ddddd9bb999999999999999999999999999999999999
    bbbb6bbbbbbb6bbbbb9999b99999999999999999bb99999999999999999999999999999999d999d999999d9d999999cccccccccccc99d9dd9d91d1dddddddd1ddd1ddd1dd1d1dd1d1d111111111111111bbbb11111111111111111111111111111111111
    bbbbbbbbbb6bb66bbbbbbbb99d999999999999999b9d99999999999999999999999999999999991919199199919999bcccbbbbcccb1991919191d9dd9d919d9ddd9ddddddddd1dd91dddd1dddd1dddd9b6666dd111111111111111111111111111111111
    bbbbbbbbbbbbbbbbbbbbbbbb99dd99d9999999999b9d999d999d999999999999999999999999999999999199199991bccbbcbbbccb9919999999999d999999d9d99dd9d9dd9d9d9dd9dd9dddddd9dd9666666bddd1ddd1d1dd1dd1d1dd1d1d1d1d1d1d1d
    bbbbbdbbdbddbbb99999bb999d9999d999999d9d9bd9d999d999999999999999999d99d9dd9999d99ddd99999d9d9bbcbbc66cbb6bd9999999999d99999999999999999999d99999999999d99999ddb66c6666bdd99ddddd9ddddd9ddddddddddddddddd
    bbbbbbbbbdbdbbddddddddddd9dddddddddddd9dbbddddddddd9d9d99999999999d99dd99d9999d9dddd9d9ddddd9bbbbbbbbbcbbbd9dddddd9dddddd9ddddddddddd9dd9d9dddd99dddddd9dddd99666c6c6cbbddd9ddddd9d9dd9ddd9ddddddddddd9d
    bbbbbdbdddbdbbbddddddd9dddddddddddddddddbbddddddddddddddddddddddddddddddddddddddddddddddddddd9bcbcbbbbcbcb9ddddddddddddddddddddddddddddddddddddddddddddddddddb6c6ccccc6bbdddddddddddddddddddddddddd9dd9d
    bbbbbbbbbbbdbdbbdbdbbbbdbbbdddddddddddbdbbddddddbddddddddddddddddddbdddddddddddddddddddddddddddbbcbbbbbbbd9ddddddbddddddddddddddddddddddddddddddddddddbdddddd6cccccc6c6bbddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbdbbbbbbbbbbbdbbbbbbdbbbbbddbdddbbbbdbdddddddbdbbdddbddbdbdddddbddbdddddddddddbbbbb6bbbbbdddddddddddddddddbbbbbbbdddbbdddddddddddddddb6bbdddb6cccccccc6bbddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbdbbbdbbbbdbdbdbbdbdbbdbbdbbdbddbbbbbbbbbbbdbbbdddbddbdddddbdbddddbdbdddddddddddddddddbbbdbdbbbccbccccbcbdddddddddddddddddddddddddddddddd
    bbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbdbbdbbbbbbbbbdddbbbbbbbbbbbbbcbbbbbbbbbdddbdddbdbbbdbdddddddddddddd
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb66bbdbdbbbccbbbccbbbddbbbbbdbdbbbbbbbbbbbbdddbddbdb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb6666bbbbbbbcccbcccbbbdddbbbbbbbbbbbbbbbbbbbdbddbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbddbbbbbbbbbbbbbdbbbbbbbbbccbccbbbbbbbbbbbbbbbbbbbbbb6666bbbbbbbbbbbbbbbbbdbccccc6bbbbbbbbbbbbbbbdbdbbbbbbbbbbbbbbbbbbbbddbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbcbbbdddbbbbbbbbbbdbbbbbbbbbbbbdbbbbbbbbbbccccccbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbb66ccc6bbbbc6bbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    dbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbdbdbbbbbbbbbbbbc6c6c6cbdbbbbbbbbbbbccccccbbbbbbbbbbbbbbbb66ccbbbbbbbbbbbbbbbbbbbbbbbbbcccccbdbcccc6bbbccbbbbbdddbbbbbbbbbbbbddbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbc6ccccccccbcbccbbccbbccccccbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbcccccbcccc6cbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbcebbbdddbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbcbccbbcbdbbbbbbbbbbbbbbbbbbbbbbbbbbbb6cccbbccccccbbbbbbbbbbbbbbbbbbbbb6bbbbbbbbbbbbbbbbbbbbbbbbbcccbbbcccbbbccccccbbbbbbbdbbbbdbbbbbbbbbbbbbbbbbbd
    bbbbccbcbbbbbbbbbccbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbccbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbccccccbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbcbbbbcc6cc66bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bcbccccccccbbbbbbbbbbbbbbccbcbddbbbbbbbcbcbbcbcbbddd3dbbbbbcbbbbbbbbbbbbbbbbbbb66cccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbddbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bccccccccbcbdbcbbccbccccccbbbbbbbbbbbbbcbcbccccccbddddddbbbbbbdbbbbbbbbbbbbcbbbcccccccccccccccfcbbbccbbbbbbbbbbbbbbbbbbdbdbbcbbbbbbbbbbbbbbbbbbbbccbbbbbbbccbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bcbbcccccccbbcccccccccccbcccbbccbbbbbbbbbbbbccccccbdddddddbbcbdbbbbbbbccbcccccbbbbbbbbbbbbbbbbbbbccccccbddbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbcccbbbcccccbbbbbbbbcccbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    ccbcccccccccccccccccccccccccbccccbccccbd333ddbbbbccbbddddbbbcbbbbbbbbbbcccbbbccccccccccccccccccccbcbbbcccccccccccccccccccccbbbcccbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    cbbccbbbbcccccccccccccccccccbccccccccceb3d3d3333dbbccbdbbbbccbbbbbbbbbbbbbcccbbcccccbccccbbcccccbbbccbbbcccccbbccccbcccccbbcccbcbbbbbbbcbbbbcbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbcbbbbbbbb
    ccbcbbbbbcccccccccccccccccccbccccccccccbdd3ddddddbbccbbbddbbcbbbbbbbbbbbbcccccbbccccbcccccccccccbbcccccbbccccbcccccbcccccbccbccbbcbbbcccbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbccbbbcccbbbbbcbb
    ccccbbbbbbbbcbccccccccccccccbcccccccccccbd33dddbbbcbbbbbbdbccbbbbbbbbbbbbcbbbccbccccbccccbbcccccbcbbbbcbbccccbcccccbcccccbbbbbcbbbbcbcccbbbbcbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccebbbbbbbbbb
    cccbbcebebbbbbbbbbbccbcccccccccccccccccccbddbbbbbbbbbbbdddbbcbbbbbbbccbbbcbbbbbbcbbbbbbbcbbcccccbbbbcbbbbccccbbccbbbb6cccbbbbbcbb6bccccccbbccbbbbbbbbbcccccbbbbbbbbeccbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbb
    ecebeeeeebbbbbbbbbbbbbccccbbccccccccccccccbbbbbbdbbbbbddbdbccbbbbbbccccbbbcccbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbcccbbbccccccccccccbbbbbbbbbcccccccbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbb
    ccccccceccccccccccceccccbb333bbcccccccccccbbbbbdbbbbbbdbbbbccbbbbbcccccbbbccccbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbcbcbbbcccccccccccccbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccccccccccbbbbeebbd3333bbbcccccccbbbbbdbbbbbbbbbbbbccbbdbbcbcccbbbccccbbbcccbbcccbbbcccbbbcccfbbbbcccbbcccbbbcccbbccccbbbccccccccccccccbbcbbbbccccccccccccccccccbebeeccccccccccccccccbcccccccccb
    beecccccbbbbbeebbbbbeeeeeebbd333333bbccccbdbddbbbbbbbbbbbbbccbdbbbcbbbbbbbccccbbccccbbcccbbccccbbbccccbbbccccbbccccbccccbbccccbbbbbbbcccccccccccbbbbbbcccccccccccccccbbbeebeccccececeebbbbbbbbbbccccbbbb
    bceeeebbebbbbbbbbebebeeeeeeeebb33d333dbbcbbbbbbbbbbbbbdbbbbcccbbbccb6bcbbbccccbbccccbbcccbbccccbbbccccbbbccccbbccccbccccbbbcbcbbbbbbbcccccccccccccbbcccccccccccccbbbbbbeeeccceeeeeeeeeeeeebbbbbeeebbbbbb
    bebbeeeeebbbbbeeeeeeeeeeeeeeeeebb33ddbbccbdbbbbbbbbbbbbbbbbcccbbbccbbbcbbbccccbbccccbbfcfbbccccbbbcccfbbbccccbbccccbccccbbbcccbbb6b6bcccccccccccccccccccccccccccccbbbbecccceeeeeeeeeeeeeeeeeceeeeeeeebbb
    eeeeeeeebbbbeeeeeeeeeeeeeebebbbebbbbbccccbbbbbbbbbbbbbbbbbbcccbbbbbb66cbbbccccbbccccbbfccbbccccbbbccccbbbccccbbccccbccccbbbcccbbb66bb6ccccccccccccccccccccccccccccccbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeececce
    eeeeebebbbeeeeeeeeeeeeeeee4eb4bbdbbbbccccbbbbbbbbbbbbbbbbbbcccbcb6bbccc6bbccccbbccccbbfcfbbccccbbbcccfbbbccccbbccccbccccbbcfccbbb66bbbbcccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeeeeeeeeeeeeceeececc
    eeeebbbbbeeeeeeeeeeeeeeeebebebbbbbbbbccccbbbbbbbbbcbbbbbbbbbccbbb6b6cccbbbccccbbccccbbcccbbccccbbbccbcbbbccccbbccccbccccbbccbcbbb66c6b666cccccccccccccccccccccccccccccccbbbeeeeeeeeeeeeeeeeeeeeccccccccc
    eebbbbbbbeeeeeeeeeeeeeee4eebbdbbbbdbbccccbbbbcbbbbbbbbbbbbbbbbbbb6bc6cccccbbbbccbbbbccbbbccccbccbbbbbbbbbcbbbccbbbbccbbbccbbbbcbbb6cccbb66ccccccccccccccccccccccccccccccccbbbbeeebeeeeeeeeeeeeecccccccec
    eeeeeebbbeeeeeeeeeeeeeeeebbdbbbbbbdbbccccbbbbbbbbbbdbbbbbbbbbbbbb6c6ccccbccccccbccccbcccccbcccccbccccccccccccccccccbccccc6cccccbb66c6cc6666cccccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeeeeeeccceeeee
    eeeeeeebbeeeeeeeeeeeeeebbbbbbbdbdbdbbccbcbdcbbbbbbbbbbbbbbbbbbbbbc66ccc6bcccccbbccccbcccccbccccbbccccccbbccccbbccccbccccbbcccccbbb6c66c6bb6cccccccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeeeeccceeeee
    eeeeeeeebeeeeeeeeeeeebbbbbbbbbdddbddbccccbbbbbbbbbbbbbbbbbbbbbbb6cccccccbbccccbbccccbccccbbccccbbbcccbcbbccccb6ccccbccccbbcccccbbbb6c6cbb666cccccccccccccccccccccccccccccccccccccbbbeeeeeeeeeeeeceeeeece
    eeeeeebeeeeeeeebeeebbbbbbbbdbbdddddddccccbbbbbbbbbbbbbbbbbbbbbbbcccccccccccc6ccccccccccccccccccccccccccbcccccccccccccc6ccccccbbbbbb66cc66bb66cccccccccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeeeeeeee
    eeeeeeeeeeeeeeebebbbbbbbbdbdbbddddddbccccbbbbbbbbbbbcbbbbbbbbb6cccccccccbbcccbbbccccbccccbbcccc6bbbccccbbccccbbccccbbcccbbbcccbbbbbb6ccc6b6666ccccccccccccccccccccccccccccccccccccccbbbeeeeeeeeeeeeeeeee
    eeeeeeebebeebbebbbbbbbbbbbbdbbdddddbbccccbbbbcbbbbbcbbbbbbbbbb6cccccccccb6cfcccbcfccbcfffcbcfffbbbcffcbbbcffcbcfcfcbcfccbbbbcccbdbbb66cccbbb66ccccccccccccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeeee
    beebebebeeebebbbbbbbbbbbbbbbdddddddbbccccbbbbbbbbbccbbbbbbb666ccccccccccbccccccccfccccfcfcccfcfcbccfffcbccffccccccccccccccbbcccbddbbb6ccccb666ccccccccccccccccccccccccccccccccccccccccccbbbbeeeeeeeeeeeb
    beeeebebbbebbbbbbbbddbbbbbbbdddbdddbbccccbbcbbbbcccccbbbc6bc6ccccccccccc6ccccccccfccccfcfcccfcfcccccffcbccccccccccccccccccccbbbbddbbbb6ccccb6cccccccccccccccccccccccccccccccccccccccccccccbbbbeeebeebeee
    beeebbbbebbdbbbbbbdddbbcbbbbdbdbdbdbbccccbbbbbccbbccccc6c6c6ccccccccccccccccccccccccccccccccccfcbccfffcbccccccccccccccccccbbbdbbdddbcbbcccccbccc6cccccccccccccccccccccccccccccccccccccccccccbbbbeeeebeeb
    bbebbebbbdbbbbbbbbddbcccbbbdbbdbdbbddccccbbbbcccbbccccccccbccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbcbddbccb6ccccc6c6ccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbebe
    ebebebbdbbbbbbdbbbddbcbccbbdbbdbdbbdbccccccccbbbbccccccc66ccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbddbcccbbccccc6666cccccccccccccccccccccccccccccccccccccccccccccccbbbeeebe
    ceebbdbbbbbbbbddbbddbcccbdbdbbdbdddbbccccbcbcbbbccccccccccccccc6ccccccccccc6cccccccccccccccccccccccccccccccccccccccccc6cccbbddddddbccccbbccccc66ccccccccccccccccccccccccccccccccccccccccccccccccccbbbbeb
    cbbdbbbbbdbbbbdbbbdbbcbbbdbdbbdddddbbccccbbbbbbbccccccccccccccc6ccccccccccccc6c6cccccc6c6cccccccccccccccccccccc6c6ccc6bbbddddddddddbbcccbcccccc6ccccccccccccccccccccccccccccccccccccccccccccccccccccbbbb
    bbbbbbbbddbbbbddddddbbbbbdbbbddddbbbbccccbbbbbcccccccccccccc66b6c6cc666ccccccccccccccccccccccccccccccccccccccccccc66bbddddddddddddddbbbbbbb666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccbb
    ccbbbbbbddbbbbddddddbbbbbbbbdddbbbbbdbcccbbbbbccccccccccccc66c66666cccccccccccccccccccccccccccccccccccccccccccccbbbbbdbdddddddddddddbbbbb666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbbdbbbddbddddddbddbbbbbbdddbdbbbbbbcccccccbccccccc6ccccbcccccccc6ccbcccccccccccccccccccccccccccccccccccccccbbbbbbbbbddddddddddddddbbb666cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbdddddbbddbbbbbbbbdbdbbbbbbcccccccbbcccccc6cccc6cccccccc6cbccccccccccccccccccccccc6ccccccccccccbbbbbbbbbdddddddddbbbbdddddbbb6cccc66cc6ccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbdddddbbddbbbbbbbdbbdbbdbbbccccbcccbccc66bbcccbcccccccc66c6cccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbcccccbbbbb6cccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbdddddbdddbbddbccbcbbdbbdbbbbbbccccbcccbbbcbbbccccccccccccc6cbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbccccccbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdddddddbdbdddbbddbbcccbbdbbbbbbbbbccccbcccbbbbbbbccccccccccccb6bbcccccccbbbbbbcbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdddddddbbbdddbbdbbccccbbdbbbbbbbbbccccbccbbdbbddbbbbbbbbbbbbbdbbbbbcbbbbbbbbbbbbbbbbbbdbbbdbbddbccbbddddbdbbdbbbbbbbbbbbbbbbbbbbbbbcb6ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdbddbdddbbddbbdddbccbcbbbbdbcbbbdbccccbbcbdddddbbbbbdddddbddddbbbbbdddddddddddddbdddbdddbbddbdddccbbbddbbdbbdbddddddddddddddddddbbccbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdddbbddbbbddbddddbbbbcbbbbdbbbbbdcbbccbcbdddddddddbbbbbbbbbbbbbbbbbbbbbbddddbbddbddbebddbbdbcddbffbbbddbbdbcdbbddbddbdddbddddbbbbbccccccccfffcfcccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdddbbdddbbddbddddbbbbcbdbdbbbbdbbccbccbbbdbbbdbbbbbbbbbbbbbbbbbbbbbbddddddddbbddcbdbbbddbbdbbddbffbbbddbbdbcdbbddcddcdddbbddddbbbbccccccccccfffcccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbbdbbbdddbbdddbbdbbbbbcbddbcbbdbcbbbbbbddddbbbbb6ddbbbbbbbbbbbbbbddddddddbbddbbddcbdbbbbdbdddbddbfccbbddbbddbdbbdbcbbcbddcbdbdddddbbcccccc6bcccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbdddddbbddbbbbbbdccbbbbbcbbddddddddbbbb6bdbbbccbbbbddbddddddddbddbbddcbddbbdbbbdbddbbdddbccbbdbbdddbbddbddbddcbddcbdebdddddbc6cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbbddddbbddbbbbbbccbbdbcbcbbdddddddddbbcccbbbbccbbbbbddddddbbdbcbdbbddbbbbbddddddddddddddbfcbddddddddddddddbddbbddbbdcbdddbdb66bccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbdbdddbbdbbbbbbcbcbbbbcbcbbdddddddddbcccccbcccccbbbbddddddcbdbcbdbbbbbddddddddddd99ddddddbcdddddd9ddddddbdddbbdddbbdbbdddebbbc6ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdbbddddbdbddbbbdbccbbccbcbcbccbcbbddddddddbcccfccbbcccbbbbbddbddbbbddbbbbdddddddddddddddd9bbb99dbbdddd9999ddddbbddbdddbbddddbddbebbbcccccccccccccccffcccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdbbdddddbbddbbbdbccccccbbbccccbcbddddddddbbbbbbbbbbbbbdddbbddcbdbbddbbddddddddbdddddddddddddddddbbdddddddddddddbddddddddddbbddddcbdbcccc6cc6ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbdbbdddddbbbebbbdbcccbccbcbcbccbcbddddddddbbbbddddddddddddbbdbcbdbcbbdddddddddb99bddddd9bdddddddbccbddddddd9ddddddddbdddddddddddbbbdbccccccc66ccccccccccccccccccccccccccccfccccccccccccccccccccccccccc
    ccbbbdbbddbbbcccbdbccccbbbbcbcbbcbcbddbddddbbbbbbbbbbbbbdbdbbbbccbbbbddddddd9ddddddddbb9bdddddddddbbbbddddddddddddddddddddddddddbbbddddbccccccc6ccccccccccccccccccccccccccccfccccccccccccccccccccccccccc
    ccbddbbbddbbbbbbbbdccbccbdccbcbbcbbdddbbddbbbbbbbbbccbbbbddbdbdbbbddddddd9b99dddd9bdddddddddddddddbccbddddddddddddddd9ddddddd1ddbdddddbbbcbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbddbbbddbbbbdbbbdccbbbcbccbcbbcbddddbbdbbbbbbbbbcccbbdddbbdbbbbddddddbbddbbbbb9ddddddd9bddddbbdbcc6dddddddd99ddddddddddddddddbbbbddbbbbbbccccccccccccccccccccccccccccccccccccfcccccccccccccccccccccccc
    ccbddbbbddbbbdbbbbdccbdbfbccbcbbbbddddddbbbbbbbbbccccbddddbbbbbdddddbbbbddbbbbdddddddb9bbddddddbccbbbddbdddddd999dddddddddb999ddbbbbddbbbbbcccccccccccccccccccccccccccccccfccccfcccccccccccccccccccccccc
    ccbddbbbdccbdbdbbbdbcbdcfbccbcbbbdddddddbbbbbbbbbbccbddbbbcbdddddddddddddbbbddddddbddbb9bbdddddbccccccbbbdddddd99bddd9dddddd999ddddddddddbbbcccccbccccccccccccccccccccccccccccccfccccccccccccccccccccccc
    ccbddbbbdbcbbbdbbbdbcbbccbccbcbdddbddddbbdddbbddddddddbbddbbddddddddbbbbbb9dddddbbddbddddddddddccccccbbbbddddddddddddd99ddddddd99b9dddddddbbccccccccccccccccccccccccccccccccccccfccfcccccccccccccccccccc
    ccbddbbbdbbbbbdbbbbcccbccbbcbbbdddbdddbbbbbbcbbbbbbbdbdddbbbddddddbbbbbbbddddddb9dddbdddddddddbcccccccbcbdddddddddddddd9bdddddd999bdbdbbdbbbbcccccccccccccccccccccccccccccccccccfccffccccccccccccccccccc
    ccbddbdbbdbbbbdbbdbcccbccbbcbbbdddbdddcccccbceebbbbdddbbdbbbdddddbbbbbbbddddd9b9dbbbbddbbdddbcccccccccbcbddbbdddddddd9ddd9dddddd9d999bbbbbbbbbb6ccccccccccccccccccccccccccccccccfccffccccccccccccccccccc
    ccbddbbbbdbbbbbbbdbcccbccbccbbdddbbddbccccccccbbbbbdddcbbbdddddddbbbbb6ddbbddbbddddbddbbddbb6cccccccccbcbddbbbdddbddddddd9bdddddd9bbdbbdddbbdbbcccccccccccccccccccccccccccccccccfccccccccccccccccccccccc
    ccbdbbbbddbbbbdbbcbccbbccbbbbdddddddbbbbbbccccbbbbddddcbddddddddbbbbbbbdbbddbbdbbbdddbbbbbcc6cccccccccbddbbbbbdddbdddddbddb9dd9ddddddddbdddddbbcccccccccccccccccccccccccccccccccfccccccccccccccccccccccc
    ccbddbbbddbbbdbdcccccbbccbbddddddddbbbbbbbbbbbbbbddddbcbdddddddddddddbdd6bdd6bbdbdbddbbbbccccccccccbbbbbbbbbbddddbddddddd9bbdd99ddb9dd1dddddddbbccccecccccccccccccccccccccccccccfccccccccccccccccccccccc
    bcbdbbbbddbbdddbcccccbbbfbddddddddbbbbbbbbbbbbbbbddbbbcbdddddddddddddddbbbdbbbbdbbbddbbbbcccccccccccbbbddbbbbddddddddd9ddd9bbddddddddddd9dddddbbcccceccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbbdbbbdbbbdbdbcccccbbcbbddddddddbbbbbbbbbbbbbbdbbdddcbddddbdddddbbbddddbdbbbdbbdbddbbc6cccccccccbbbbbbbbbddbdddbddddd9ddb9bddddddddddddddddddbcccceccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccbbdbbbbbbbbfbbcccccbbbddbddddddbbbbccbbbbbbbbbdddddbbbdddbdddbdddbbddbbbd66bbdbdbbdb66c6ccccccbbbbbbbddddbbdddbbdddbdddbbbbdddddddddddbdddddbbbbbcccccccccccccccccccccccccccccccccccccccfccccccccccccc
    ccbbdbbbdbddbccbcccccbbbdbbdddddbbbbbcccbbbbbbbdddbbbbbbdddbddddbbbbbddbbbdb66bdbbbbbbb6cccccccccbbbbbbbbbbdddbbdddddbbbdb9b9d999ddddddd9dddddbbbbbcccccccccccccccccccccccccccccccccfccccfcccccccccccccc
    ccbddbbbddddcccbccccccbbdbbddddbbbbbccccccbbbbbdbbbbbbbddddbdbdddddbbddbb6dd666bb6bbcccbcccccbbbbbbbbbddddddbbbddddbddbddbbbddb99ddddddddddddddbbbbcccccccccccccccccccccccccccccccccfccccccccccccccccccc
    ccbddbbdbccdccbbcccccbbdbccdddbbbbbccccbcbbbbbbbbdddbbebdddbdbdddddddddbbbbdb666bbbcccccbbbc6c6bbbbbbbbbbbbbdddddbddddddb9bbdd9bdddddddd1dddbddbebcccbbccccccccccccccccccccccccccccccccccccccffccccccccc
    ccbddbbdcfcbccbbccbbbbddbbcbddbbbbbcccbccbbbbbdddbbdddebdddbdbbbbdddbbddbbbddb666ccccccccbbbdddbbbbbbbbddddddddbbbbdddbbbbbddbbbd1ddddddddddddddeebbbbbccccccccccccccccccccccccccccccccccccfcffccccccccc
    ccbbbbdccccbccbbbbbbbdddbbbddbbbbbccccccbbbbbddddcbdddcbdddbdb6b66bbbbddbbb6bdb666cbbcccc66bbbbddddddddddddbbbbbbdddddbbbbddb9bddddddddbddddddddeedbbbbbc6cccccccccccccccccccccccccccccccccfccfccccccccc
    ccbbbbbccccbccbbbbbbdddbbbbdbbbbbccccccbbbbbbddddcbdddcbdddbbdbb66bb6bbddb666bdbcccc66c66bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbd9ddddbbbddddbddddddbebddbbbcc6cccccccccccccccccccccccccccccccfccccccccccccc
    ccbbbdcccccbbccbbbbdbddbbbdbbbbbbbbbbbbbbbbbddddbcbdddcbdddbbdb6b66bbbbbddb6bbbbbbc66666bbddddbb6bbbbbdbbbbddddbbbbbbbdddbd9ddddddbb9bdb9ddddddddcbdbbbbbc6cccccccccccccccccccccccccccccccfccccccccccccc
    ccbddbcccccbbccbbdbbdddddddbdddddddddddddddddddbbebbbdbbddddbdd666bbbbbbbdddbeebbbbbb66bbbbbbddbbddbbbdddddddbbdbbbbddddddddddddddddbdd9dddddddbcbddeeebbc66b66666666c6cc6ccccccccccccccccfccccccccccccc
    ccbddbccbccbcccbbbbdddddddbbbbbbbbbbbbddbbbbbbbbbebbbbbdddddbbddbbbbbbbbbdddbbb66bbbddbbdddb6bbbbbbbbbbbbbbbbdddbddddbbbdddddddd9dddbbbdddddddccbdddeecbbbccccccc6cccccccccccccccccccccccccccccccccccccc
    ccbddbcbbccbbbbbdddbbddddbbbbbbbbbbbbddbbbbbbbbbbbccbbdddddddbbddbb6bbbbbbbbbbbbbbbb6bddddddbbbbbbbbbbbbbbbbdddddddbddbbddddbb9b99ddd9bddddddbbbddddecccbbbccccccccccccccccccccccccccccccccccccccccccccf
    cccbdbbbbccbbbbbbddbbdddbbbbbbbbbbbbbdbbbbddbbbbbccccbdbddddddbbddbbbbdbbdb6bbddddbb6b6bbbbdddddddddddddddddddbbbbbbbddddddb9bbbbb9dddddddddddddddddbcccdbbbcccccc6ccccccccccccccccccccccccccffccccccccf
    cccbbbbccccbbbbbdddbbdddbbbbbbbbbbbbddbbbbdbbbbbbbbccbdebddddddbbddbbbddddbbddbbbddddbbbb3b66bbbbbbbbbbbbbbb6bd3bbddddddddddddbbb99ddddddddddddbbbbdbccbdbbbcccccccccccccccccccccccccccccccccfcccccccccc
    cccbbbcccccbbbdddddbbbdbbbbbbbbbbbbbdbbbbdddbbbbbbcccbbebdddddddbbdddbbbbbbdbbdbb66dddddddbbb666b6bbbbbbbbbbbbddddddddbbbbbbdddddddddddddddddddbebcbbbbbddbbbcccccc6ccccccccccccccccccccccccccccccccccff
    cccbbccbccbbbbbbdbbbbdbcbbbbbbcbbbbddbbbbdddbdbbb6cccbbbbbddbddddbbbdddddddddddbbddbdbbbbddddddddddddddddddddddd9bbdddb9bbbbdddd9dddddddddbddddbebcbcbbbbbbbbccccccccccccccbbccccccccccccccccccccccccccc
    cccbbcbbbbbbbbbdbdbddbbcbbbbbccbbbddbbbbdddddbbb66ccbbbcbbdbedddddbbbdddddddd66bbbdddb6bb6bbbbbbbddddddddd9dddbbbbbddbbbbbbbbdddddddddddddeddddbeecbcbbdeeedbbccccccccccccb9dbcccccccccccccccccccccccccc
    cccbbcbbbbbbddbddddddbcbcccccccbbbdbbbbdddddddbbcccbbdbcbddccdddddddbbbddddb6bbbbbbddbbbbbbbbbbbdbbddddddddddbbbbbbdddbbbbbbbdddddbddddddbfbddddbecbbdddbebdbbcccccccccccccbddbcccccccccccccccccccccccff
    cccbbccbbbbbddddddddbccccccccccbbddbbbbdddddbbbccbbbbdbbbddccbbddddbbbbbbddddbbdddddbbbb6bbbbbbdddbbbddbddddddbddbbbbddddbbddddbdddddddddbcbdddbcccdddddbebbbbbcccccccccccccbbbbcccccccccccccccccccccccf
    cccbbbbbbbbbdddddddbccccccccccbbbdbbbbddddddddbcbbbbbbbbbddccbdddbeccbddbbbbddddbbbb66b6bb6bddddddbbddddddddddddbbbbbbbbdddddddddddddddddcfbddbccbddddddbeebbdbbcccecccccccccccccccccccccccccccccccccccf
    cccdbbbbbbbbddddddbcccccccccccbbddbbbbdddddddddbbbbbbbbbdddccbdddbccccbddddbbbbdddddbbbb6bbbbbbdbdddddddddbbbdbbbbbbdddddddddddddddddddddbbbbbcccbddddddbeebddbbcccccccccccccfcfcccccccccccccccccccccccf
    cccbbbbbbdbdddddbbcccccccccccbbbdbbbbbdddddddddbbbbbbbddddbccbddbccccbddddddddbbbbbddddddbbbbbbbbbbbbbbbbbbbbdddddddddddbddddddddddddddddbbbbbbbdddddddbbecbddbbbccccccccccccccccccccccccccccccccccccccf
    cccbbbbbdbbbbddbbbccccccbbcccbbddbbbbbdbddddddbcbbbdbbbdddbbbbddbccccbdddebddddddbbbbbbbbddddddddddddddddddddddddbbbbbddddddddddddbbdddddbbcbbddddddddddbbbbddbbbc6cccccccfccccccccccccccccccccccccccccf
    cccbbbbddbbbbdbbbcccccccbbccbbbbbbbbbbddddddbbbbddbbb6bbbbbbcbddbcccccddbcbdddddddddddbbbbbbbbbbbbbbbbbbbbbbbbcbbdddddddddbbddddddc6bdbbbcbbdddddddbbddbbcbddddbbcccccccccccccccccccccccccccccccccccccff
    cccbbbbbbbcbdbbbccccccccccccbbbbbbbbbbddddbbccbdddbbbcccbbbbbdddbccccbddbceddddddddbbbbdddddddddddddddbebbddbccdddddddddddbcdddddbccbdbccbddddddddcebbbccbddbddbbbccccccccccfccccccccccccccccccccccccccf
    bbbbbbbbbbcbddbccccccfccfccbbbbbbbbbcbddddbccbbdddddbcbbcbbddddbbcbbbbddbccbdddddddccccbdddbddddddddddbccdddcccbdddddddddbccbdddddccccbbbddddddddbccbbccbdddcbddbbccccccccccffffffcccccccccccccccccccccc
    bbbbbbbbbbbbdbccccccfffcccbbbbbbbbbbbbdddbbbbbddddbbccbbbdbdbbbcbbdbbdddcccbddddddbccccbddbcbdddddddddbccbddccccdddddddddcccbdddddbcccbddddddddddbccbbbbddddccbbbcccccccccccccffffcccccccccccccccccccccc
    bbbbdbbddbddbcccccccccccbbbbbbbbbbbbbbbdddddbbddddddbcbbddbbbcbbbbbcbdddbbbdddddddbfcccbddbfedddddddddcccbddccccbdddddddbbccbddddbcbcbddddddddddddbbbddddddbcccbbccccccccccccccccccccccccccccccccccccccc
    bbbbbbdddddbbcbbcccccbbbbbbbddddddbbbbbdddddbbddddbbcbbddbbcbbbbccbbdddbcbbddddddddccccbddbccbdddddddbcccbddbccbbddddddddbcfbddbbcccbddddddddddddbcbbddddddbfccbbccccccccccccccccccccccccccccccccccccccc
    bbbbdbbbddbbcbbbbbbbbbbbbbbbddddddccebdddddbebdbbbccbbbdbbbbbbccbbdbbbbcbbbbddddddddbbbbddccccdddddddbdccdddbbbbdddddddddbbbbdbccccbddddddddddddbcccbddddddbcccbcccccecccccccccccccccccccccccccccccccccc
    bbbbbbbbbdbcbbbbbbbbbbbbbbbddddddbccbbdddddeebbbccbbbbbddbbccbbbdbbbccbbbbbddddbbbbbbbbbddccccddddddddddcbddbbdbddddddddbbbbbbcccbbdddddddddddbcccbbddddddddcccccccccecccccccccccccccccccccccccccccccccc
    bbbbbbbbdbccbbbbbbbbbbbbbbbbbbbdbcccbbdddbbbeebbcbbbbdddddbccbbbbbccbbbbbbddddbbdbbbbbbdddcccbddddbddbbbcbddbbbbdddddddbbccbbbbcbdddddddddddddbccbdddbdddddbcfccccccceeccccccccccccccccccccccccccccccccc
    bbbbbbbdbccbbbbbbbbbbbbbbbbcfccccccbbbbddbbbcbbbbbbbdbbbbbbbcbdbbbbbbbbbddddddbbbbbccbbddbbbbbdddddbbbcbbbbbccbbddddddbcccbddbbbdddddddddddddbbcbddddebddddbcfcbcccccecccccccccccccccccccccccccccccccccc
    bbbdbbbbccbbbbbbbbbbbbbbbbbccccccccbbbdddbbcbbbbdbbbddbddddbccbdbdbbbbbddddddddbbccbbbbbdbbbbbdddbbccbbbdbcccbdddddddbcccbddddddddddddddddddddddddddbcebddbbcccbccccccccccccbdbccccccccccccccccccccccccc
    bbdbbbbbcbbbbbbbbbbbbbbbbbcccccccccbdddbbccbbddddbcbdddddbbccebdddddddddddddddbcccbbdddbbcccbbddbcccbbbbbcccbdddddddb6cbbdddddddddddddddddb4ddddddddbcebddbccccbccccceccccccbddbcccccccccccccccccccccccc
    bbbbbbbcbbbbbbbbbbbbbbbbbbcccfccccbbdbbccbbddbdddbccddbbbccccebbdddddddddbbbbbccbbbbdbbbcccbddbdbbbbdbcbccbbddddbdddbbbddddbddddddddddddddbebdddddddceebdbccccbbcccccccccccccdddbccccccccccccccccccccccc
    bbbbbbccbbbbbbbbbbbbbcbbbcccfccccbbdbbbbbbdddbdddbccbbbccbbbcebddddddddddebbcccbbdddbcbccbbdddcbdddddbcbbbdddddbcbdddddddddbbbddddddddddddeecdddddddbeebdbcccbbbcccccccccccccccccccccccccccccccccccccccc
    bbbbbccbbbbbbbbbbbbbcbbbccfccfffcbdbbdbbdddddddddbbbdbbbbbbbccebddddddddbcebbbbbddddbeebbbdddbfbbddddbcbbddddddbccbddddddddbccbdddddddddddbcbddddddddbbdbbcbbdbbcccccccccccccccccccccccccccccccccccccccc
    bbbbcccbcbbbbbbbbbbbcbbb6ccccccbbbddddddddddddddddbcddbdbbbecceebbddddddbfebdbdddddbbcebdddddcfcbddddbfcbddddddbccbddddddddbccbdddddddddddbcbddddddddbbddbbddddbbcccccccccccccfccccccccccccccccccccccccc
    bbbbcbcbbbbbbbbbbbbcbbdb666bbbdddddddddddddddddddbbcbdddddbecccbbbddddddbccbdddddddbbcbdddddbfccbddddcccbddddddbcbdddddddddbccbddddddddddbeebddddddbbbbdddddddddbb6ccc6ccccfcccccccccccccccccccccccccccc
    bbbccbbbbbbbbbbbbbccbbbcccbbbbbbbbbbbbbbbbbbbbbbccccbbdbbbbceccbbbbdddddbcebbbbdddbdbcebbddbecccebddbbccbddddddbccddddddddbcccbbdddddddddbeebddddbbccccbddbbbbbbbbcccccccccfcccccccccccccccccccccccccccc
    bbccbcbbbbbbbbbbbccbcccccbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbcccbbbebbbbbbccbbbbbbbbbbccbbbbbecfccbbbbbfccbbbbbbbccbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbccccccccccccffcccccccccccccccccccccccccc
    ccccbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbcccbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbcccbbbbbbbbbbbbbcccccccccccfccccccccccccccccccccccccccf
    ccbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbcbbbbbbccbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccf
    cbcbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbbbbcdddddddddbbbbddddddddbbbbdddddbbbdddddbbbbddddddcbcbddddddddbbdbdddddddddbbccddddbbbdbdddddddbbbbbbcccccccccccfffffcccccccccccccccccccccc
    cbcbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbddddddddddddddbbccbbddddddddbbcbbddddddddbcbbddddbbccbddddbcbcbddddbccbdddddddddbcbbbddddddddbcccddddddddddddddddddbbbbbbcccccccccccfffffccccccccccccccccccccc
    bcbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbccccbbbbbbbbccccbbbbbcfccbbbbbcccbbbbbbcccbbbbbbbbbcccccbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccfccccccccccccccccccccccc
    bcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbccccccbbbbbbccccccbbbbcccccccbcccccbbbbbcccccbbbbbbbbcccccbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccc
    cbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccbcbbbbbccccccbbbbbbbccccccbbbbbcccccbbcccccbbbbbbccccbbbbbbbbbccccbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccc
    cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbcccccccbbbbbbcccccbbbbbbcccccbbcccccbbbbbbccccbbbbbbbbbccccbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccc
    bbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbccccbcbbbbbbccccccbbbbbbcccccbbcccccbbbbbbccccbbbbbbbbbccccbbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccc
    bbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbcccbbbbbbbbbbccccbbbbbbbccccbbbbcccbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccc
    bbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccc
    `)
music.play(music.createSong(assets.song`Invasion_music`), music.PlaybackMode.InBackground)
pause(5000)
scene.setBackgroundImage(assets.image`Inizio`)
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
mySprite = sprites.create(img`
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.Player)
mySprite.sayText("... Cos'è questa puzza di fumo?", 4000, true)
pause(4000)
sprites.destroy(mySprite)
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
z1_ripulita = false
mySprite = sprites.create(assets.image`Eroe`, SpriteKind.Player)
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
    }
})
