@namespace
class SpriteKind:
    NemicoPotenziato = SpriteKind.create()
    GuardiaPortale = SpriteKind.create()
    BossFinale = SpriteKind.create()
    Blocco = SpriteKind.create()
    Narratore1 = SpriteKind.create()
    Narratore2 = SpriteKind.create()
    Cristallofuoco = SpriteKind.create()
    Attacco_sfera_fuoco = SpriteKind.create()
    CristalloGhiaccio = SpriteKind.create()
    Narratore3 = SpriteKind.create()
    Attacco_sfera_ghiaccio = SpriteKind.create()
    Narratore4 = SpriteKind.create()
    Narratore5 = SpriteKind.create()
    Personaggio1 = SpriteKind.create()
    Personaggio2 = SpriteKind.create()
    Regina = SpriteKind.create()
    Contadino = SpriteKind.create()

def on_overlap_tile(sprite16, location4):
    if sprite16 == attaccoFuoco:
        tiles.set_tile_at(location4, sprites.castle.tile_path5)
    sprites.destroy(sprite16)
scene.on_overlap_tile(SpriteKind.projectile,
    assets.tile("""
        Ghiaccio_1
    """),
    on_overlap_tile)

def on_on_overlap(sprite, otherSprite):
    global vitaNemicoPotenziato
    if sprite == attaccoFuoco:
        vitaNemicoPotenziato += -1
        if vitaNemicoPotenziato <= 0:
            sprites.destroy(otherSprite, effects.ashes, 500)
            music.play(music.melody_playable(music.pew_pew),
                music.PlaybackMode.IN_BACKGROUND)
            sprites.destroy(narratore_3)
    else:
        music.play(music.melody_playable(music.thump),
            music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(sprite)
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.NemicoPotenziato,
    on_on_overlap)

# Narratore

def on_on_overlap2(sprite21, otherSprite14):
    global cittàAperta
    game.show_long_text("Non sei ancora pronto per affrontare l'Invasione",
        DialogLayout.BOTTOM)
    game.show_long_text("Nella città si dice che vi sia nascosta una bacchetta,",
        DialogLayout.BOTTOM)
    game.show_long_text("Potrebbe canalizzare il potere del cristallo e renderti più potente!",
        DialogLayout.BOTTOM)
    game.show_long_text("Cosa aspetti, presto,valla a cercare!", DialogLayout.BOTTOM)
    cittàAperta = True
    sprites.destroy(otherSprite14, effects.blizzard, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Narratore4, on_on_overlap2)

def on_up_pressed():
    global direzioneColpo
    controller.move_sprite(eroe)
    direzioneColpo = 3
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Narratore

def on_on_overlap3(sprite18, otherSprite12):
    game.show_long_text("I mostri ci stanno attaccando! Proteggi il cristallo, presto!",
        DialogLayout.TOP)
    game.show_long_text("Per attaccare premi \"A\" muovendoti nella direzione nella quale vuoi che vada il colpo",
        DialogLayout.TOP)
    sprites.destroy(otherSprite12, effects.blizzard, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Narratore1, on_on_overlap3)

def on_overlap_tile2(sprite8, location2):
    global nemicoPotenziato, p2QuestUscita, vitaNemicoPotenziato
    tiles.set_tile_at(location2, sprites.dungeon.floor_light2)
    nemicoPotenziato = sprites.create(assets.image("""
            Nemico potenziato
        """),
        SpriteKind.NemicoPotenziato)
    nemicoPotenziato.set_position(21 * 16, 4 * 16)
    p2QuestUscita = sprites.create(assets.image("""
        asddassad
    """), SpriteKind.Blocco)
    p2QuestUscita.set_position(20 * 16, 37 * 16)
    nemicoPotenziato.follow(p2QuestUscita, 20)
    vitaNemicoPotenziato = 5
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Portaaperta
    """),
    on_overlap_tile2)

def on_on_overlap4(sprite39, otherSprite20):
    sprites.destroy(otherSprite20, effects.trail, 500)
    music.play(music.melody_playable(music.pew_pew),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(sprite39)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap4)

def spriteCittà():
    global p1, p2, reginaCittà
    p1 = sprites.create(assets.image("""
        scimmia
    """), SpriteKind.Personaggio1)
    tiles.place_on_random_tile(p1, assets.tile("""
        spawnPersonaggio
    """))
    p2 = sprites.create(assets.image("""
            personaggio2
        """),
        SpriteKind.Personaggio2)
    if p2Quest:
        tiles.place_on_random_tile(p2, assets.tile("""
            Spawn aiutante quest
        """))
    else:
        tiles.place_on_random_tile(p2, assets.tile("""
            spawnPersonaggio
        """))
        p2.y += -16
    reginaCittà = sprites.create(assets.image("""
        regina
    """), SpriteKind.Regina)
    tiles.place_on_random_tile(reginaCittà, assets.tile("""
        spawnPersonaggio
    """))

def on_b_pressed():
    global vx, vy, attaccoGhiaccio, attaccoFuoco
    if direzioneColpo == 1:
        vx = 110
        vy = 0
    elif direzioneColpo == 2:
        vx = -110
        vy = 0
    elif direzioneColpo == 4:
        vx = 0
        vy = 110
    elif direzioneColpo == 3:
        vx = 0
        vy = -110
    if ghiaccio:
        attaccoGhiaccio = sprites.create_projectile_from_sprite(assets.image("""
            Attacco di ghiaccio
        """), eroe, vx, vy)
        pause(1000)
        sprites.destroy(attaccoGhiaccio)
        pause(1000)
    elif fuoco:
        attaccoFuoco = sprites.create_projectile_from_sprite(assets.image("""
            Attacco di fuoco
        """), eroe, vx, vy)
        pause(1000)
        sprites.destroy(attaccoFuoco)
        pause(1000)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_overlap_tile3(sprite35, location15):
    cambiaZona(6)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile10
    """),
    on_overlap_tile3)

def on_on_overlap5(sprite14, otherSprite10):
    info.change_life_by(-3)
    music.play(music.melody_playable(music.zapped),
        music.PlaybackMode.IN_BACKGROUND)
    pause(2000)
sprites.on_overlap(SpriteKind.player, SpriteKind.GuardiaPortale, on_on_overlap5)

# Villaggio

def on_on_overlap6(sprite2, otherSprite2):
    global progressoCittà, bacchetta
    if progressoCittà == 2:
        if bacchetta == False:
            story.sprite_say_text(otherSprite2, "Ho saputo che hai aiutato la mia gente... ")
            story.sprite_say_text(otherSprite2,
                "...perciò ti darò la possibilità di ottenere la bacchetta.")
            story.sprite_say_text(otherSprite2, "Ma non credere che sia facile...")
            story.sprite_say_text(otherSprite2,
                "per ottenere la bacchetta dovrai risolvere un'ENIGMA!")
            story.sprite_say_text(otherSprite2,
                "Trova il messaggio nascosto nell'immagine per ottenere la bacchetta")
            story.show_player_choices("Apriti sesamo",
                "Abracadabra",
                "Mostrati",
                "Rivelati",
                "Sottomettiti")
            if story.get_last_answer() == "Rivelati":
                story.sprite_say_text(sprite2, "Bravo, la risposta è corretta")
                story.sprite_say_text(otherSprite2, "Ecco a te la bacchetta, te la sei meritata")
                story.sprite_say_text(otherSprite2,
                    "Aumenterà il danno provocato e la velocità degli attacchi")
                progressoCittà += 1
                bacchetta = True
    elif progressoCittà == 3:
        story.sprite_say_text(otherSprite2, "Vai a fermare l'Invasione!")
    else:
        story.sprite_say_text(otherSprite2, "Sparisci della mia vista, plebeo!")
sprites.on_overlap(SpriteKind.player, SpriteKind.Regina, on_on_overlap6)

def on_on_overlap7(sprite15, otherSprite11):
    global p2Vita, p2QuestFallita
    p2Vita += -1
    pause(2000)
    if p2Vita == 0:
        tiles.set_current_tilemap(tilemap("""
            tileMapTrieste
        """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            Spawn aiutante quest
        """))
        tiles.place_on_random_tile(otherSprite11, assets.tile("""
            Spawn aiutante quest
        """))
        p2QuestFallita = True
        p2Vita = 15
sprites.on_overlap(SpriteKind.enemy, SpriteKind.Personaggio2, on_on_overlap7)

def on_overlap_tile4(sprite40, location17):
    cambiaZona(5)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.collectible_insignia,
    on_overlap_tile4)

def on_on_overlap8(sprite12, otherSprite8):
    global BANANNA
    if sprite12 == attaccoGhiaccio:
        if contadinoDialogo1 and not (BANANNA):
            sprites.destroy(sprite12, effects.spray, 500)
            story.sprite_say_text(otherSprite8,
                "Ah, ci voleva proprio una bella rinfrescata",
                15,
                1,
                story.TextSpeed.NORMAL)
            story.sprite_say_text(otherSprite8,
                "Ecco a te le banane, come promesso!",
                15,
                1,
                story.TextSpeed.NORMAL)
            BANANNA = True
        else:
            story.sprite_say_text(otherSprite8,
                "Ah, ci voleva proprio una bella rinfrescata",
                15,
                1,
                story.TextSpeed.NORMAL)
            story.sprite_say_text(otherSprite8,
                "Prendi delle banane, come ringraziamento",
                15,
                1,
                story.TextSpeed.NORMAL)
            BANANNA = True
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Contadino, on_on_overlap8)

def on_a_pressed():
    global projectile
    if direzioneColpo == 1:
        projectile = sprites.create_projectile_from_sprite(img("""
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
            """),
            eroe,
            100,
            0)
        pause(100)
        sprites.destroy(projectile)
        animation.run_image_animation(eroe,
            [img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """)],
            100,
            False)
    elif direzioneColpo == 2:
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            myImage
        """), eroe, -100, 0)
        pause(150)
        sprites.destroy(projectile)
        animation.run_image_animation(eroe,
            [img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """)],
            100,
            False)
    elif direzioneColpo == 4:
        projectile = sprites.create_projectile_from_sprite(assets.image("""
            attacco inbasso
        """), eroe, 0, 100)
        pause(100)
        sprites.destroy(projectile)
        animation.run_image_animation(eroe,
            [img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """),
                img("""
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
                """)],
            100,
            False)
    pause(500)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap9(sprite23, otherSprite15):
    global contadinoDialogo1
    if BANANNA:
        story.sprite_say_text(otherSprite15,
            "Grazie mille amico",
            15,
            1,
            story.TextSpeed.NORMAL)
    elif progressoCittà == 0:
        if not (contadinoDialogo1):
            story.sprite_say_text(otherSprite15,
                "Ehi, la faresti una cosa per me?",
                15,
                1,
                story.TextSpeed.NORMAL)
            story.sprite_say_text(otherSprite15,
                "Se mi aiuterai ti darò un casco di banane (anche se non è molto)")
            controller.move_sprite(sprite23, 0, 0)
            story.show_player_choices("Accettare", "Rifiutare")
            controller.move_sprite(sprite23, 100, 100)
            if story.get_last_answer() == "Accettare":
                story.sprite_say_text(otherSprite15,
                    "Fa un caldo di questi giorni, se potessi rinfrescarmi un po' te ne sarei grato!")
                contadinoDialogo1 = True
            else:
                story.sprite_say_text(otherSprite15, "Va bene, sarà per la prossima volta...")
sprites.on_overlap(SpriteKind.player, SpriteKind.Contadino, on_on_overlap9)

def closeinventory():
    global inventarioAperto
    inventarioAperto = False
    controller.move_sprite(eroe)
# Cambio mondo

def on_overlap_tile5(sprite28, location10):
    cambiaZona(3)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Da città a mondo generale
    """),
    on_overlap_tile5)

def on_left_pressed():
    global direzioneColpo, selectedIndex
    controller.move_sprite(eroe)
    direzioneColpo = 2
    selectedIndex = max(selectedIndex - 1, 0)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap10(sprite30, otherSprite18):
    if sprite30 == attaccoGhiaccio:
        if randint(1, 6) >= 3:
            sprites.destroy(otherSprite18, effects.disintegrate, 500)
            music.play(music.melody_playable(music.pew_pew),
                music.PlaybackMode.IN_BACKGROUND)
    else:
        music.play(music.melody_playable(music.thump),
            music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(sprite30)
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.GuardiaPortale,
    on_on_overlap10)

# Attacchi

def on_on_overlap11(sprite42, otherSprite22):
    info.change_life_by(-1)
    music.play(music.melody_playable(music.zapped),
        music.PlaybackMode.IN_BACKGROUND)
    pause(1000)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap11)

def on_overlap_tile6(sprite27, location9):
    cambiaZona(2)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile6)

# Game Over

def on_on_overlap12(sprite13, otherSprite9):
    game.set_game_over_message(False, "Il cristallo è stato rubato!")
    game.game_over(False)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.Blocco, on_on_overlap12)

def openinventory():
    global inventarioAperto, selectedIndex
    inventarioAperto = True
    controller.move_sprite(eroe, 0, 0)
    selectedIndex = 0
# Attacchi

def on_right_pressed():
    global direzioneColpo, selectedIndex
    controller.move_sprite(eroe)
    direzioneColpo = 1
    selectedIndex = min(selectedIndex + 1, len(arrTools) - 1)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# Game Over

def on_on_overlap13(sprite41, otherSprite21):
    game.set_game_over_message(False, "Il cristallo è stato rubato!")
    game.game_over(False)
sprites.on_overlap(SpriteKind.NemicoPotenziato,
    SpriteKind.Blocco,
    on_on_overlap13)

# Combattimento

def on_on_overlap14(sprite7, otherSprite5):
    global fuoco
    fuoco = True
    tiles.set_tile_at(tiles.get_tile_location(21, 3), sprites.castle.tile_grass1)
    arrTools[2] = assets.image("""
        Attacco di fuoco
    """)
    arrToolsNames[2] = "Cristallo fuoco"
sprites.on_overlap(SpriteKind.player, SpriteKind.Blocco, on_on_overlap14)

def on_on_destroyed(sprite37):
    global morteGuardie
    morteGuardie += 1
    if zonaCorrente == 7 and morteGuardie == 9:
        tiles.set_tile_at(tiles.get_tile_location(19, 18),
            assets.tile("""
                Boss finale blocco
            """))
        tiles.set_tile_at(tiles.get_tile_location(19, 22),
            assets.tile("""
                myTile23
            """))
        tiles.set_wall_at(tiles.get_tile_location(19, 22), False)
sprites.on_destroyed(SpriteKind.GuardiaPortale, on_on_destroyed)

# Villaggio

def on_on_overlap15(sprite4, otherSprite3):
    global progressoCittà
    if progressoCittà == 0:
        if BANANNA == False:
            story.sprite_say_text(otherSprite3, "Portami una banana!")
        elif BANANNA == True:
            story.sprite_say_text(otherSprite3, "Grazie per la banana!")
            progressoCittà = 1
    else:
        story.sprite_say_text(otherSprite3, "Gnam")
sprites.on_overlap(SpriteKind.player, SpriteKind.Personaggio1, on_on_overlap15)

# Narratore

def on_on_overlap16(sprite5, otherSprite4):
    game.show_long_text("Il tuo prossimo obiettivo è il castello",
        DialogLayout.BOTTOM)
    game.show_long_text("Sembra che i mostri lo stiano già attaccando",
        DialogLayout.BOTTOM)
    game.show_long_text("Vai a prendere il cristallo di ghiaccio e poi vai nel portale a fermare l'Invasione!",
        DialogLayout.BOTTOM)
    sprites.destroy(otherSprite4, effects.blizzard, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Narratore5, on_on_overlap16)

def on_overlap_tile7(sprite36, location16):
    cambiaZona(9)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        strada settentrionale
    """),
    on_overlap_tile7)

def on_overlap_tile8(sprite19, location6):
    if zonaCorrente == 4:
        cambiaZona(3)
    else:
        cambiaZona(4)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Teletrasporto per morte
    """),
    on_overlap_tile8)

# Villaggio

def on_on_overlap17(sprite20, otherSprite13):
    game.show_long_text("Attento! Il mostro sta scappando con il cristallo!",
        DialogLayout.BOTTOM)
    game.show_long_text("Usa il fuoco per fargli del danno, è il suo punto debole!",
        DialogLayout.BOTTOM)
    sprites.destroy(otherSprite13, effects.blizzard, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Narratore3, on_on_overlap17)

def on_down_pressed():
    global direzioneColpo
    controller.move_sprite(eroe)
    direzioneColpo = 4
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_menu_pressed():
    if inventarioAperto:
        closeinventory()
    else:
        openinventory()
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def on_life_zero():
    global narratore_4, arrNemici
    if zonaCorrente == 4:
        tiles.set_current_tilemap(tilemap("""
            Mappa generale
        """))
        eroe.set_position(32 * 16, 32 * 16)
        narratore_4 = sprites.create(assets.image("""
                sptNarratore
            """),
            SpriteKind.Narratore4)
        narratore_4.set_position(31 * 16, 31 * 16)
        info.set_life(10)
        sprites.destroy_all_sprites_of_kind(SpriteKind.GuardiaPortale)
        arrNemici = []
    else:
        game.set_game_over_message(False, "GAME OVER!")
        game.game_over(False)
info.on_life_zero(on_life_zero)

# Inventario

def on_create_renderable(screen2):
    pass
spriteutils.create_renderable(100, on_create_renderable)

# Villaggio

def on_on_overlap18(sprite9, otherSprite6):
    global p2Quest, progressoCittà
    if progressoCittà == 0:
        story.sprite_say_text(otherSprite6, "Dov'è la mia scimmia?...")
    if progressoCittà == 1:
        if p2QuestFallita:
            story.sprite_say_text(otherSprite6,
                "Dobbiamo riprovarci! Se vuoi la bacchetta devi scortarmi fino a lì!")
        elif p2QuestVittoria == True:
            story.sprite_say_text(otherSprite6, "Grazie mille per l'aiuto!")
            story.sprite_say_text(otherSprite6, "Parlerò bene di te alla regina!")
            p2Quest = False
            progressoCittà = 2
        if p2Quest:
            story.sprite_say_text(otherSprite6, "Andiamo!")
        else:
            story.sprite_say_text(otherSprite6,
                "Sei amico della mia scimmia... forse puoi aiutarmi ... ")
            story.sprite_say_text(otherSprite6,
                "Io dovrei andare dal medico sulla strada settentrionale... ")
            story.sprite_say_text(otherSprite6, "...ma quel posto è infestato di mostri!")
            story.sprite_say_text(otherSprite6,
                "Se mi scortassi fino a destinazione potrei parlare bene di te alla regina...")
            story.sprite_say_text(otherSprite6,
                "Io ti aspetterò all'ingresso della strada Nord")
            story.sprite_say_text(otherSprite6, "Ci vediamo lì, ciaooo")
            tiles.place_on_random_tile(otherSprite6, assets.tile("""
                Spawn aiutante quest
            """))
            p2Quest = True
    elif progressoCittà == 2:
        story.sprite_say_text(otherSprite6, "Grazie mille per l'aiuto")
sprites.on_overlap(SpriteKind.player, SpriteKind.Personaggio2, on_on_overlap18)

def on_overlap_tile9(sprite31, location12):
    cambiaZona(8)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Tel da castello a mappa generale
    """),
    on_overlap_tile9)

# Combattimento

def on_on_overlap19(sprite26, otherSprite17):
    global ghiaccio
    ghiaccio = True
    arrTools[3] = assets.image("""
        Attacco di ghiaccio
    """)
    arrToolsNames[3] = "Cristallo ghiaccio"
    sprites.destroy(otherSprite17)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.CristalloGhiaccio,
    on_on_overlap19)

# Cambio mondo

def on_overlap_tile10(sprite22, location7):
    if zonaCorrente == 0:
        cambiaZona(1)
    elif zonaCorrente == 1 or zonaCorrente == 2:
        cambiaZona(0)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Porta casa
    """),
    on_overlap_tile10)

def on_hit_wall(sprite10, location3):
    tiles.set_wall_at(location3, False)
    tiles.set_tile_at(location3, assets.tile("""
        muro distrutto
    """))
scene.on_hit_wall(SpriteKind.NemicoPotenziato, on_hit_wall)

# Villaggio

def on_on_overlap20(sprite11, otherSprite7):
    global sferaDaPrendere
    sferaDaPrendere = sprites.create(assets.image("""
            sferadaprendere
        """),
        SpriteKind.Cristallofuoco)
    sferaDaPrendere.set_position(21 * 16, 5 * 16)
    game.show_long_text("Grazie mille per aver protetto il villaggio!",
        DialogLayout.BOTTOM)
    game.show_long_text("In tutto il mondo, i mostri stanno cercando di rubare i cristalli ",
        DialogLayout.BOTTOM)
    game.show_long_text("I cristalli sono 3: il cristallo di fuoco, quello che abbiamo protetto oggi,",
        DialogLayout.BOTTOM)
    game.show_long_text("il cristallo di ghiaccio, custodito al castello,",
        DialogLayout.BOTTOM)
    game.show_long_text("e, infine, il cristallo dei fulmini, che i mostri hanno già rubato",
        DialogLayout.BOTTOM)
    game.show_long_text("Le tue sole forze non basteranno per contrastare l'invasione",
        DialogLayout.BOTTOM)
    game.show_long_text("Prendi il cristallo di fuoco, e usa i suoi poteri per uscire di qui!",
        DialogLayout.BOTTOM)
    sprites.destroy(otherSprite7, effects.blizzard, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.Narratore2, on_on_overlap20)

# NEMICI

def on_on_overlap21(sprite25, otherSprite16):
    info.change_life_by(-3)
    music.play(music.melody_playable(music.big_crash),
        music.PlaybackMode.IN_BACKGROUND)
    pause(1000)
sprites.on_overlap(SpriteKind.player, SpriteKind.BossFinale, on_on_overlap21)

def on_pause_until():
    True
# Cambio Zona
def cambiaZona(zona: number):
    global spawnBossFinale, VitaBossFinale, arrNemici, eroe, narratore_1, contadino1, sferaFuoco, p2, zonaCorrente, direzioneColpo
    spawnBossFinale = True
    VitaBossFinale = 16
    sprites.destroy(eroe)
    sprites.destroy(narratore_1)
    sprites.destroy(narratore_2)
    sprites.destroy_all_sprites_of_kind(SpriteKind.GuardiaPortale)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    arrNemici = []
    sprites.destroy(narratore_3)
    sprites.destroy(narratore_4)
    sprites.destroy(narratore_5)
    sprites.destroy(contadino1)
    sprites.destroy(p1)
    sprites.destroy(p2)
    sprites.destroy(reginaCittà)
    eroe = sprites.create(assets.image("""
        Eroe
    """), SpriteKind.player)
    # scene.setBackgroundImage()
    # spriteutils.moveTo(mySprite, spriteutils.pos(32 * 16, 32 * 16), 100, true)
    scene.camera_follow_sprite(eroe)
    controller.move_sprite(eroe, 100, 100)
    if zona == 0:
        tiles.set_current_tilemap(tilemap("""
            casa iniziale
        """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            letto 1
        """))
        eroe.y += 32
        if z1Ripulita == False:
            narratore_1 = sprites.create(assets.image("""
                    sptNarratore
                """),
                SpriteKind.Narratore1)
            narratore_1.set_position(8 * 16, 18 * 16)
    elif zona == 1:
        if z1Ripulita == True:
            tiles.set_current_tilemap(tilemap("""
                Villaggio
            """))
            contadino1 = sprites.create(assets.image("""
                Contadino
            """), SpriteKind.Contadino)
            eroe.set_position(5 * 16, 8 * 16)
        else:
            tiles.set_current_tilemap(tilemap("""
                Villaggio distrutto
            """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            Porta casa
        """))
        eroe.y += 16
        sferaFuoco = sprites.create(assets.image("""
            sferadaprendere
        """), SpriteKind.Blocco)
        sferaFuoco.set_position(21 * 16, 5 * 16)
    elif zona == 2:
        tiles.set_current_tilemap(tilemap("""
            Villaggio
        """))
        contadino1 = sprites.create(assets.image("""
            Contadino
        """), SpriteKind.Contadino)
        contadino1.set_position(5 * 16, 8 * 16)
        tiles.place_on_random_tile(eroe, assets.tile("""
            Ghiaccio_3
        """))
        eroe.y += -32
        tiles.set_tile_at(tiles.get_tile_location(38, 29), sprites.castle.tile_path5)
        tiles.set_tile_at(tiles.get_tile_location(39, 28), sprites.castle.tile_path5)
        tiles.set_tile_at(tiles.get_tile_location(39, 29),
            assets.tile("""
                tel mappa centrale
            """))
        if fuoco == True:
            tiles.set_tile_at(tiles.get_tile_location(21, 3), sprites.castle.tile_grass1)
    elif zona == 3:
        tiles.set_current_tilemap(tilemap("""
            Mappa generale
        """))
        if zonaCorrente == 7:
            tiles.place_on_random_tile(eroe, assets.tile("""
                Blocco teletrasporto portale
            """))
        else:
            tiles.place_on_random_tile(eroe, assets.tile("""
                myTile2
            """))
        eroe.y += 32
    elif zona == 4:
        tiles.set_current_tilemap(tilemap("""
            Tilemap morte
        """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            myTile35
        """))
    elif zona == 5:
        tiles.set_current_tilemap(tilemap("""
            Castello
        """))
        music.play(music.create_song(assets.song("""
                Musica castello
            """)),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        tiles.place_on_random_tile(eroe,
            assets.tile("""
                Tel da castello a mappa generale
            """))
        eroe.y += -32
    elif zona == 6:
        tiles.set_current_tilemap(tilemap("""
            tileMapTrieste
        """))
        scroller.set_layer_image(scroller.BackgroundLayer.LAYER0,
            assets.image("""
                trieste
            """))
        scroller.scroll_background_with_camera(scroller.CameraScrollMode.BOTH_DIRECTIONS,
            scroller.BackgroundLayer.LAYER0)
        eroe.x = 144
        eroe.y = 336
        spriteCittà()
    elif zona == 7:
        tiles.set_current_tilemap(tilemap("""
            Bossfight portale
        """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            myTile35
        """))
    elif zona == 8:
        tiles.set_current_tilemap(tilemap("""
            Mappa generale
        """))
        tiles.place_on_random_tile(eroe, sprites.dungeon.collectible_insignia)
        eroe.y += 32
    elif zona == 9:
        tiles.set_current_tilemap(tilemap("""
            Strada settentrionale
        """))
        tiles.place_on_random_tile(eroe, assets.tile("""
            da strada nord a città
        """))
        eroe.y += -32
        sprites.destroy(reginaCittà)
        sprites.destroy(p1)
        sprites.destroy(p2)
        if p2Quest:
            p2 = sprites.create(assets.image("""
                    personaggio2
                """),
                SpriteKind.Personaggio2)
            p2.follow(eroe, 45)
            tiles.place_on_random_tile(p2, assets.tile("""
                da strada nord a città
            """))
    zonaCorrente = zona
    direzioneColpo = 0

def on_overlap_tile11(sprite17, location5):
    if zonaCorrente == 7:
        cambiaZona(3)
    else:
        cambiaZona(7)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Blocco teletrasporto portale
    """),
    on_overlap_tile11)

def on_on_overlap22(sprite33, otherSprite19):
    info.change_life_by(-2)
    music.play(music.melody_playable(music.zapped),
        music.PlaybackMode.IN_BACKGROUND)
    pause(1000)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.NemicoPotenziato,
    on_on_overlap22)

def on_overlap_tile12(sprite3, location):
    if sprite3 == attaccoFuoco:
        tiles.set_tile_at(location, assets.tile("""
            tel mappa centrale
        """))
    sprites.destroy(sprite3)
scene.on_overlap_tile(SpriteKind.projectile,
    assets.tile("""
        Ghiaccio_3
    """),
    on_overlap_tile12)

def on_overlap_tile13(sprite34, location14):
    tiles.set_tile_at(tiles.get_tile_location(19, 19),
        sprites.dungeon.door_closed_north)
    tiles.set_wall_at(tiles.get_tile_location(19, 19), True)
    tiles.set_tile_at(tiles.get_tile_location(19, 7),
        assets.tile("""
            Spawn boss finale
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Boss finale blocco
    """),
    on_overlap_tile13)

def on_on_destroyed2(sprite38):
    global z1Ripulita, narratore_2, narratore_3
    arrNemici.remove_at(arrNemici.index(sprite38))
    if len(arrNemici) == 0:
        if zonaCorrente == 1 and zone1SpawnCnt == 6:
            effects.blizzard.start_screen_effect(2000)
            tiles.set_current_tilemap(tilemap("""
                Villaggio
            """))
            z1Ripulita = True
            narratore_2 = sprites.create(assets.image("""
                    sptNarratore
                """),
                SpriteKind.Narratore2)
            narratore_2.set_position(eroe.x - 16, eroe.y - 17)
            info.change_life_by(3)
        elif zonaCorrente == 5 and zona5SpawnCnt == 8:
            eroe.say_text("Una porta si è aperta in questa area!", 5000, True)
            tiles.set_tile_at(tiles.get_tile_location(25, 3),
                assets.tile("""
                    Portaaperta
                """))
            tiles.set_wall_at(tiles.get_tile_location(25, 3), False)
            narratore_3 = sprites.create(assets.image("""
                    sptNarratore
                """),
                SpriteKind.Narratore3)
            narratore_3.set_position(27 * 16, 3 * 16)
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed2)

def on_overlap_tile14(sprite29, location11):
    global p2QuestVittoria
    effects.smiles.start_screen_effect(500)
    pause(500)
    p2QuestVittoria = True
    cambiaZona(5)
    tiles.place_on_random_tile(eroe, assets.tile("""
        Spawn aiutante quest
    """))
    tiles.place_on_random_tile(p2, assets.tile("""
        Spawn aiutante quest
    """))
scene.on_overlap_tile(SpriteKind.Personaggio2,
    assets.tile("""
        Arrivo personaggio2
    """),
    on_overlap_tile14)

def on_overlap_tile15(sprite24, location8):
    global narratore_5, spawnNarratore5
    cambiaZona(3)
    if spawnNarratore5:
        narratore_5 = sprites.create(assets.image("""
                sptNarratore
            """),
            SpriteKind.Narratore5)
        narratore_5.set_position(eroe.x + 10, eroe.y + 10)
        spawnNarratore5 = False
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        tel mappa centrale
    """),
    on_overlap_tile15)

def on_on_destroyed3(sprite6):
    global sferaDaPrendere
    sferaDaPrendere = sprites.create(assets.image("""
            Attacco di ghiaccio
        """),
        SpriteKind.CristalloGhiaccio)
    sferaDaPrendere.x = sprite6.x
    sferaDaPrendere.y = sprite6.y
sprites.on_destroyed(SpriteKind.NemicoPotenziato, on_on_destroyed3)

def on_overlap_tile16(sprite32, location13):
    cambiaZona(6)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        da strada nord a città
    """),
    on_overlap_tile16)

bossFinale: Sprite = None
zona9SpawnCnt = 0
zona7SpawnCnt = 0
zona4SpawnCnt = 0
zona5SpawnCnt = 0
zone1SpawnCnt = 0
sferaFuoco: Sprite = None
contadino1: Sprite = None
narratore_5: Sprite = None
narratore_2: Sprite = None
narratore_1: Sprite = None
VitaBossFinale = 0
spawnBossFinale = False
sferaDaPrendere: Sprite = None
narratore_4: Sprite = None
zonaCorrente = 0
selectedIndex = 0
inventarioAperto = False
projectile: Sprite = None
BANANNA = False
contadinoDialogo1 = False
p2QuestFallita = False
bacchetta = False
attaccoGhiaccio: Sprite = None
vy = 0
vx = 0
reginaCittà: Sprite = None
p2Quest = False
p2: Sprite = None
p1: Sprite = None
p2QuestUscita: Sprite = None
nemicoPotenziato: Sprite = None
direzioneColpo = 0
narratore_3: Sprite = None
vitaNemicoPotenziato = 0
attaccoFuoco: Sprite = None
arrNemici: List[Sprite] = []
arrToolsNames: List[str] = []
arrTools: List[Image] = []
eroe: Sprite = None
morteGuardie = 0
p2QuestVittoria = False
p2Vita = 0
progressoCittà = 0
z1Ripulita = False
ghiaccio = False
fuoco = False
spawnNarratore5 = False
cittàAperta = False
p2Regina = False
toolTop = 0
tool_top = 0
Tools_names: List[number] = []
Tools: List[number] = []
cittàAperta = False
spawnNarratore5 = True
fuoco = False
ghiaccio = True
z1Ripulita = False
progressoCittà = 0
p2Vita = 15
p2QuestVittoria = False
morteGuardie = 0
scene.set_background_image(assets.image("""
    Copertina
"""))
music.play(music.create_song(assets.song("""
        invasion musica brutta
    """)),
    music.PlaybackMode.UNTIL_DONE)
scene.set_background_image(assets.image("""
    Inizio
"""))
eroe = sprites.create(assets.image("""
    Eroe
"""), SpriteKind.player)
game.show_long_text("... Cos'è questa puzza di fumo?", DialogLayout.FULL)
pause(5000)
MakeyMakey.set_makey_makey_defaults()
controller.move_sprite(eroe, 100, 100)
spada = img("""
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
""")
info.set_life(10)
arrTools = [img("""
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
    """),
    assets.image("""
        Scudo fab
    """),
    assets.image("""
        q
    """),
    assets.image("""
        sferadaprendere
    """),
    img("""
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
    """)]
arrToolsNames = ["Spada", "Scudo Fab", "", "", ""]
arrNemici = []
# Game over

def on_update_interval():
    global zone1SpawnCnt, zona5SpawnCnt, zona4SpawnCnt, zona7SpawnCnt, zona9SpawnCnt, bossFinale
    if zonaCorrente == 1 and zone1SpawnCnt < 6:
        arrNemici.unshift(sprites.create(assets.image("""
            Nemico base
        """), SpriteKind.enemy))
        if randint(0, 10) < 6:
            arrNemici[0].follow(sferaFuoco, 20)
        else:
            arrNemici[0].follow(eroe, 20)
        tiles.place_on_random_tile(arrNemici[0],
            assets.tile("""
                Spawner nemici normali
            """))
        zone1SpawnCnt += 1
    elif zonaCorrente == 5 and zona5SpawnCnt < 8:
        arrNemici.unshift(sprites.create(assets.image("""
            Nemico base
        """), SpriteKind.enemy))
        arrNemici[0].follow(eroe, 20)
        tiles.place_on_random_tile(arrNemici[0],
            assets.tile("""
                Spawner nemici normali
            """))
        zona5SpawnCnt += 1
    elif zonaCorrente == 4 and zona4SpawnCnt < 6:
        arrNemici[0] = sprites.create(assets.image("""
                Miniboss in portale
            """),
            SpriteKind.GuardiaPortale)
        tiles.place_on_random_tile(arrNemici[0], assets.tile("""
            Spawn guardie portale
        """))
        arrNemici[0].follow(eroe, 65)
        zona4SpawnCnt += 1
    elif zonaCorrente == 7 and zona7SpawnCnt < 9:
        arrNemici[0] = sprites.create(assets.image("""
                Miniboss in portale
            """),
            SpriteKind.GuardiaPortale)
        tiles.place_on_random_tile(arrNemici[0], assets.tile("""
            Spawn guardie portale
        """))
        arrNemici[0].follow(eroe, 40)
        zona7SpawnCnt += 1
    elif zonaCorrente == 9 and zona9SpawnCnt < 15 and p2Quest:
        arrNemici.unshift(sprites.create(assets.image("""
            Nemico base
        """), SpriteKind.enemy))
        arrNemici[0].follow(p2, 30)
        tiles.place_on_random_tile(arrNemici[0],
            assets.tile("""
                Spawner nemici normali
            """))
        zona9SpawnCnt += 1
    if ghiaccio:
        tiles.set_wall_at(tiles.get_tile_location(32, 38), False)
        tiles.set_wall_at(tiles.get_tile_location(33, 38), False)
    if cittàAperta:
        tiles.set_wall_at(tiles.get_tile_location(38, 32), False)
        tiles.set_wall_at(tiles.get_tile_location(38, 33), False)
    if spawnBossFinale:
        bossFinale = sprites.create(assets.image("""
            Boss finale
        """), SpriteKind.BossFinale)
        tiles.place_on_random_tile(bossFinale, assets.tile("""
            Spawn boss finale
        """))
        story.print_dialog("NON HAI SPERANZE RAGAZZINO", 80, 90, 50, 150, 10, 15)
        story.print_dialog("HO MIGLIAIA DI ANNI PIÙ DI TE...", 80, 90, 50, 150, 10, 15)
        story.print_dialog("...E SONO MIGLIAIA DI VOLTE PIÙ FORTE DI TE!!!",
            80,
            90,
            50,
            150,
            10,
            15,
            story.TextSpeed.FAST)
        bossFinale.follow(eroe, 10)
game.on_update_interval(4000, on_update_interval)
