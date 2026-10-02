import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})

export class Tab2Page implements OnInit {

  private cdr = inject(ChangeDetectorRef);

  totalTasks = 0;
  completedTasks = 0;
  inProgressTasks = 0;
  notStartedTasks = 0;
  completionPercent = 0;

  async ngOnInit() {
    await this.loadProgress();

  }

  async loadProgress() {
    const querySnapshot = await getDocs(collection(db, 'tasks'));

    const tasks = querySnapshot.docs.map((doc) => doc.data());

    this.totalTasks = tasks.length;

    this.completedTasks = tasks.filter(
      task => task['completionStatus'] === 'Completed'
    ).length;

    this.notStartedTasks = tasks.filter(
      task => task['completionStatus'] === 'Not Started'
    ).length;

    this.inProgressTasks = tasks.filter(
      task => task['completionStatus'] === 'In Progress'
    ).length;

    if (this.totalTasks > 0) {
      this.completionPercent = Math.round(
        (this.completedTasks / this.totalTasks) * 100
      );
    }
    this.cdr.detectChanges();
  }
}
